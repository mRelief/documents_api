require 'rack/test'

require_relative "spec_helper"
require_relative "test_queries"
require_relative "../app"

TEST_ENDPOINTS = TEST_QUERIES.map do |query|
  RSpecMixin.local_endpoint(query[:ruby_hash])
end

describe "queries against API endpoints" do

  TEST_ENDPOINTS.each do |query|

    it "does the right thing" do
      get query
      expect(last_response).to be_ok
    end

  end

end
