require_relative "documents_api"
require_relative "test_fixtures"

describe Api::Documents do

  subject { described_class }
  let(:outcome) { subject.fetch_documents(benefits_application)[:benefits_application] }

  describe "a one-person household" do

    let(:household_member) { outcome[:household_members][0] }
    let(:household_member_documents) { household_member[:documents_needed] }
    let(:household_member_document_names) {
      household_member_documents.map { |document| document[:official_name] }
    }

    describe "person is an employee" do

      let(:benefits_application) { SINGLE_HOUSEHOLD_MEMBER_EMPLOYED }

      it "should require paystubs documentation" do
        expect(household_member_documents.size).to eq 2
        expect(household_member_document_names).to eq [
          "Social Security Card", "Pay Stubs"
        ]
      end

    end

  end

end
