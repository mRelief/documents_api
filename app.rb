require          'sinatra'
require          'sinatra/cross_origin'
require          'json'
require          'twilio-ruby'

require './local_env' if File.exists?('local_env.rb')

require_relative 'api/documents_api'
require_relative 'sms/incoming_message_handler'
require_relative 'helpers/session_updater'

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
  session['step'] ||= 'initial'
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

  # Use the object to increment the session data with user's answers

  # Send a response
  response = handler.respond

  # Increment the session step

  # Return the response for testing purposes
  return response
end

