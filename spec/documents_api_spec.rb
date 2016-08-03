require_relative "../documents_api"

describe Api::DocumentsRequest do

  subject { described_class.new(params) }

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

  context "default params from screener" do
    let(:params) { default_params }

    it "returns the correct documents data" do
      expect(subject.fetch_documents).to eq({
        residency_documents: [
          { official_name: "State ID", description: "State ID"},
          { official_name: "Mail", description: "Mail document showing postmark within last 30 days with Illinois address"},
          { official_name: "Medical Records", description: "Medical records/clinic cards"}
        ],
        identity_documents: [
          { official_name: "State ID", description: "State ID"},
          { official_name: "School Photo ID"},
          { official_name: "U.S. Military ID Card"},
          { official_name: "Voter Registration Card"},
          { official_name: "Birth Certificate"}
        ],
        citizenship_documents: [],
        income_documents: [],
      })
    end
  end

end
