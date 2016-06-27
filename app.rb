require          "sinatra"
require          "json"
require_relative "documents_api"

get '/api/:benefits_application' do
  content_type :json

  @parsed = Rack::Utils.parse_nested_query(params)

  @outcome = Api::Documents.fetch_documents(@parsed)

  JSON.pretty_generate(@outcome)
end
