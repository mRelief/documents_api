require          "sinatra"
require          "sinatra/cross_origin"
require          "json"

require "./local_env" if File.exists?("local_env.rb")

require_relative "documents_api"

configure do
  enable :cross_origin
end

options "*" do
  response.headers["Allow"] = "HEAD,GET,PUT,DELETE,OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept"
  200
end

get '/api' do
  content_type :json

  documents_request = Api::DocumentsRequest.new(
    has_rental_income: params["has_rental_income"],
    renting: params["renting"],
    owns_home: params["owns_home"],
    shelter: params["shelter"],
    living_with_family_or_friends: params["living_with_family_or_friends"],
    all_citizens: params["all_citizens"],
    employee: params["employee"],
    disability_benefits: params["disability_benefits"],
    child_support: params["child_support"],
    self_employed: params["self_employed"],
    retired: params["retired"],
    unemployment_benefits: params["unemployment_benefits"],
  )

  @outcome = documents_request.fetch_documents

  JSON.pretty_generate(@outcome)
end

get '/screener' do
  erb :show
end

get '/sms' do
  @client = Twilio::REST::Client.new(ENV['account_sid'], ENV['auth_token'])

  @client.messages.create(
    from: ENV['twilio_number'],
    to: params[:From],
    body: 'Hey there!'
  )
end

get '/' do
  redirect to '/screener'
end
