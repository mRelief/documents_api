require 'rack/test'

require_relative "spec_helper"
require_relative "test_queries"
require_relative "../app"

TEST_ENDPOINTS = TEST_QUERIES.map do |query|
  RSpecMixin.local_endpoint(query[:ruby_hash])
end

describe "queries against API endpoints" do

  let(:response_json) { JSON.parse(last_response.body) }

  TEST_ENDPOINTS.each do |query|

    it "doesn't fail horribly" do
      get query
      expect(last_response).to be_ok
      expect(response_json.keys).to eq [
        "household_members", "other_documents_needed"
      ]
    end

  end

end
