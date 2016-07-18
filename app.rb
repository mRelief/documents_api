require          "sinatra"
require          "sinatra/cross_origin"
require          "json"
require_relative "documents_api"

configure do
  enable :cross_origin
end

options "*" do
  response.headers["Allow"] = "HEAD,GET,PUT,DELETE,OPTIONS"

  # Needed for AngularJS
  response.headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept"

  200
end

get '/api' do
  content_type :json

  documents_request = Api::DocumentsRequest.new(
    household_members: params["household_members"],
    is_applying_for_expedited: params["is_applying_for_expedited"],
    has_rental_income: params["has_rental_income"],
    renting: params["renting"],
    owns_home: params["owns_home"],
    shelter: params["shelter"],
    living_with_family_or_friends: params["living_with_family_or_friends"],
  )

  @outcome = documents_request.fetch_documents

  JSON.pretty_generate(@outcome)
end

get '/screener' do
  erb :show
end
