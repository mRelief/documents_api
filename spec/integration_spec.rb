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
      skip "rspec and Rack URI do not play well with these endpoints" do
        get url, format: :json

        # ^^ Having trouble getting rspec request spec to play nicely with
        # JSON-encoded URL query strings, throws `URI::InvalidURIError: bad URI(is not URI?)`
        # These query strings work fine in the browser..
        # Need to figure out why rspec/URI don't like 'em

        expect(last_response).to be_ok
        expect(response_json.keys).to eq [ "household_members", "other_documents_needed" ]
      end
    end

  end

end
