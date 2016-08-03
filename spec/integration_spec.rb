require 'rack/test'

require_relative "../lib/endpoint_generator"
require_relative "support/spec_helper"
require_relative "../app"

describe "queries against API endpoints" do

  let(:response_json) { JSON.parse(last_response.body) }

  let(:default_params) {
    {
      disability_benefits: "false",
      employee: "false",
      self_employed: "false",
      child_support: "false",
      retired: "false",
      unemployment_benefits: "false",
      has_rental_income: "false",
      renting: "false",
      owns_home: "false",
      shelter: "false",
      living_with_family_or_friends: "false",
      all_citizens: "true",
    }
  }

  let(:path) {
    "/api?#{default_params.to_query}"
  }

  it "returns data" do
    get path, format: :json

    expect(last_response).to be_ok
    expect(response_json.keys).to eq  [
      "residency_documents", "identity_documents", "citizenship_documents", "income_documents"
    ]
  end

end
