require 'rack/test'

require_relative "../lib/endpoint_generator"
require_relative "spec_helper"
require_relative "test_queries"
require_relative "../app"

describe "queries against API endpoints" do

  let(:response_json) { JSON.parse(last_response.body) }

  TEST_QUERIES.each do |query|

    url = EndpointGenerator.new(nil, query[:ruby_hash]).generate_url

    it "doesn't fail horribly" do
      get url, format: :json

      expect(last_response).to be_ok
      expect(response_json.keys).to eq [ "household_members", "other_documents_needed" ]
    end
  end

end
