require          "sinatra"
require          "json"
require_relative "documents_api"

get '/api/:benefits_application' do
  content_type :json

  @parsed = Rack::Utils.parse_nested_query(params[:benefits_application])

  Api::Documents.fetch_documents(@parsed)
end
