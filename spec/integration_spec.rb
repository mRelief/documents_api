require 'rack/test'

require_relative "../lib/endpoint_generator"
require_relative "spec_helper"
require_relative "test_queries"
require_relative "../app"

describe "queries against API endpoints" do

  let(:response_json) { JSON.parse(last_response.body) }

  TEST_QUERIES.each do |query|

    path = "/api?#{query[:ruby_hash].to_query}"

    it "doesn't fail horribly" do
      get path, format: :json

      expect(last_response).to be_ok
      expect(response_json.keys).to eq [ "household_members", "other_documents_needed" ]
    end
  end

end
