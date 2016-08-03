require 'rack/test'

require_relative "../lib/endpoint_generator"
require_relative "support/spec_helper"
require_relative "../app"

describe "queries against API endpoints" do
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

  let(:path) { "/api?#{params.to_query}" }

  let(:response_json) { JSON.parse(last_response.body) }

  context "default_params" do
    let(:params) { default_params }

    it "returns data" do
      get path, format: :json

      expect(last_response).to be_ok
      expect(response_json.keys).to eq  [
        "residency_documents", "identity_documents", "citizenship_documents", "income_documents"
      ]
    end
  end

  context "not all citizens" do
    let(:params) do
      these_params = default_params
      these_params[:all_citizens] = "false"
      these_params
    end

    it "returns correct citizenship documents" do
      get path, format: :json
      expect(response_json["citizenship_documents"].size).to eq 1
      expect(response_json["citizenship_documents"][0]["official_name"]).to eq "I-90 Documentation (for all non-citizen family members)"
    end

  end

end
