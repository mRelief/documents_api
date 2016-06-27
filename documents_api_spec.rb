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

        expect(household_member_documents.size).to eq 1
        expect(household_member_document_names).to eq ["Pay Stubs"]

        expect(outcome[:other_documents_needed]).to eq []
      end

    end

    describe "person is self-employed" do

      let(:benefits_application) { SINGLE_HOUSEHOLD_MEMBER_SELF_EMPLOYED }

      it "should require self-employment form" do

        expect(household_member_documents.size).to eq 1
        expect(household_member_document_names).to eq ["Self-Employment Form"]

      end

    end

    describe "applying for expedited benefits" do
      let(:benefits_application) { EXPEDITED_BENEFITS }
      let(:other_documents_needed) { outcome[:other_documents_needed] }

      it "should require bank statements" do
        expect(other_documents_needed.size).to eq 1
        expect(other_documents_needed[0][:official_name]).to eq "Bank Statements"
      end

    end

    describe "has rental income" do
      let(:benefits_application) { SINGLE_HOUSEHOLD_MEMBER_WITH_RENTAL_INCOME }
      let(:other_documents_needed) { outcome[:other_documents_needed] }

      it "should require bank statements" do
        expect(other_documents_needed.size).to eq 1
        expect(other_documents_needed[0][:official_name]).to eq "Bank Statements"
      end
    end

  end

  describe "a multi-person household" do

    let(:head_of_household) { outcome[:household_members][0] }
    let(:household_member_documents) { head_of_household[:documents_needed] }
    let(:household_member_document_names) {
      household_member_documents.map { |document| document[:official_name] }
    }

    describe "head of household working and receiving child support" do

      let(:benefits_application) { MULTI_MEMBER_HOUSEHOLD_RECEIVING_CHILD_SUPPORT }

      it "returns the proper documents:, pay stubs, and written child support statement" do

        expect(household_member_documents.size).to eq 2
        expect(household_member_document_names).to eq ["Pay Stubs", "Written Child Support Statement"]

      end

    end

    describe "multi-member household with 1 retired person, 1 employee," \
             "and 1 disabled person" do

      let(:benefits_application) {
        MULTI_MEMBER_HOUSEHOLD_WITH_RETIREE_DISABLED_AND_WORKING
      }

      let(:document_names_per_household_member) {
        outcome[:household_members].map do |household_member|
          household_member[:documents_needed].map do |document|
            document[:official_name]
          end
        end
      }

      it "returns the proper documents for each person:" \
         "award letter for retired person, award letter for disabled person," \
         "pay stubs for employee" do

        expect(document_names_per_household_member).to eq [
          ["Award Letter from Social Security"],
          ["Award Letter for Disability"],
          ["Pay Stubs"]
        ]

      end

    end

    describe "multi-member household with 1 person receiving unemployment" \
             "and 1 person working" do

      let(:benefits_application) {
        MULTI_MEMBER_HOUSEHOLD_WITH_UNEMPLOYED_AND_WORKING
      }

      let(:document_names_per_household_member) {
        outcome[:household_members].map do |household_member|
          household_member[:documents_needed].map do |document|
            document[:official_name]
          end
        end
      }

      it "returns the proper documents:" \
         "employee should submit pay stubs," \
         "unemployed person should submit award letter for unemployment," do

        expect(document_names_per_household_member).to eq [
          ["Award Letter for Unemployment"],
          ["Pay Stubs"]
        ]

      end

    end

  end

end
