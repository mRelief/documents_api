require          "sinatra"
require          "sinatra/cross_origin"
require          "json"
require_relative "documents_api"

configure do
  enable :cross_origin
end

get '/api/:benefits_application' do
  content_type :json

  @parsed = ActiveSupport::JSON.decode(params[:benefits_application])

  @outcome = Api::Documents.fetch_documents(@parsed)

  JSON.pretty_generate(@outcome)
end

get '/screener' do
  erb :show
end
