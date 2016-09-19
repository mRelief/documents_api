require          'sinatra'
require          'sinatra/cross_origin'
require          'json'
require          'twilio-ruby'

require './local_env' if File.exists?('local_env.rb')

require_relative 'api/documents_api'
require_relative 'sms/send_message'
require_relative 'sms/incoming_message_cleaner'
require_relative 'sms/responder'
require_relative 'sms/response_validator'
require_relative 'sms/session_data_updater'
require_relative 'sms/session_step_incrementer'

configure do
  enable :cross_origin
  enable :sessions
end

options '*' do
  response.headers['Allow'] = 'HEAD,GET,PUT,DELETE,OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept'
  200
end

get '/api' do
  content_type :json

  documents_request = Api::DocumentsRequest.new(
    has_rental_income: params['has_rental_income'],
    renting: params['renting'],
    owns_home: params['owns_home'],
    shelter: params['shelter'],
    living_with_family_or_friends: params['living_with_family_or_friends'],
    all_citizens: params['all_citizens'],
    employee: params['employee'],
    disability_benefits: params['disability_benefits'],
    child_support: params['child_support'],
    self_employed: params['self_employed'],
    retired: params['retired'],
    unemployment_benefits: params['unemployment_benefits'],
    recently_lost_job_and_received_paycheck: params['recently_lost_job_and_received_paycheck'],
    has_birth_certificate: params['has_birth_certificate'],
    has_social_security_card: params['has_social_security_card'],
  )

  @outcome = documents_request.fetch_documents

  JSON.pretty_generate(@outcome)
end

get '/screener' do
  erb :show
end

get '/' do
  redirect to '/screener'
end

post '/sms' do
  # Set up defaults in case the user is starting from scratch
  session['count'] ||= 0
  session['single_person_household'] ||= 'true'
  session['renting'] ||= 'false'
  session['owns_home'] ||= 'false'
  session['shelter'] ||= 'false'
  session['living_with_family_or_friends'] ||= 'false'
  session['all_citizens'] ||= 'true'
  session['employee'] ||= 'false'
  session['self_employed'] ||= 'false'
  session['retired'] ||= 'false'
  session['unemployment_benefits'] ||= 'false'
  session['has_rental_income'] ||= 'false'
  session['disability_benefits'] ||= 'false'
  session['child_support'] ||= 'false'
  session['has_state_id'] ||= 'true'
  session['recently_lost_job_and_received_paycheck'] ||= 'false'
  session['has_birth_certificate'] ||= 'false'
  session['has_social_security_card'] ||= 'false'

  session['more_housing_options'] ||= 'false'
  session['tiered_unemployment_question_one'] ||= 'false'
  session['tiered_unemployment_question_two'] ||= 'false'

  body = IncomingMessageCleaner.new(params[:Body]).cleaned

  if session['count'] == 0
    welcome_message = 'Welcome. ' +
                      'Here you can find out what documents you need to complete your Food Stamps application. ' +
                      'If you make a mistake, text \'reset\'. (1/2)'
    SendMessage.new(welcome_message, params[:From]).send
  else
    validator = ResponseValidator.new(params[:From], body, session)
    return validator.respond_to_invalid! unless validator.valid?
  end

  # Update the session data
  new_session = SessionDataUpdater.new(session, body).update_data
  session = new_session

  # Send a response
  response = Responder.new(params[:From], session).respond

  # Increment the session step
  new_session = SessionStepIncrementer.new(session).increment
  session = new_session

  # Return the response
  return response
end

