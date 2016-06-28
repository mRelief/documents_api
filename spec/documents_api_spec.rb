require_relative "../documents_api"
require_relative "test_fixtures"

describe Api::Documents do

  subject { described_class }
  let(:outcome) { subject.fetch_documents(benefits_application) }

  describe "a one-person household" do

    let(:applicant) { outcome[:household_members][0] }
    let(:documents) { applicant[:documents_needed] }
    let(:document_names) { documents.map { |document| document[:official_name] } }
    let(:information_needed) { applicant[:information_needed].map { |info| info[:official_name] } }

    describe "person is an employee" do

      let(:benefits_application) { SINGLE_HOUSEHOLD_MEMBER_EMPLOYED }

      it "should require paystubs documentation" do

        expect(document_names.size).to eq 1
        expect(document_names).to eq ["Pay Stubs"]
        expect(information_needed).to eq ["Social Security Number", "Date Of Birth"]
        expect(outcome[:other_documents_needed]).to eq [subject.residency_documents]
      end

    end

    describe "person is self-employed" do

      let(:benefits_application) { SINGLE_HOUSEHOLD_MEMBER_SELF_EMPLOYED }

      it "should require self-employment form" do

        expect(document_names.size).to eq 1
        expect(document_names).to eq ["Self-Employment Form"]

      end

    end

    describe "applying for expedited benefits" do
      let(:benefits_application) { EXPEDITED_BENEFITS }
      let(:other_documents_needed) { outcome[:other_documents_needed] }

      it "should require bank statements" do
        expect(other_documents_needed.size).to eq 2
        expect(other_documents_needed).to eq [
          subject.residency_documents, BANK_STATEMENTS
        ]
      end

    end

    describe "has rental income" do
      let(:benefits_application) { SINGLE_HOUSEHOLD_MEMBER_WITH_RENTAL_INCOME }
      let(:other_documents_needed) { outcome[:other_documents_needed] }

      it "should require bank statements" do
        expect(other_documents_needed.size).to eq 2
        expect(other_documents_needed).to eq [
          subject.residency_documents, BANK_STATEMENTS
        ]
      end
    end

  end

  describe "a multi-person household" do

    let(:applicant) { outcome[:household_members][0] }
    let(:documents) { applicant[:documents_needed] }
    let(:document_names) { documents.map { |document| document[:official_name] } }

    let(:document_names_per_person) {
      outcome[:household_members].map do |household_member|
        household_member[:documents_needed].map do |document|
          document[:official_name]
        end
      end
    }

    let(:information_needed_per_person) {
      outcome[:household_members].map do |household_member|
        household_member[:information_needed].map do |info|
          info[:official_name]
        end
      end
    }

    describe "head of household working and receiving child support" do

      let(:benefits_application) { MULTI_MEMBER_HOUSEHOLD_RECEIVING_CHILD_SUPPORT }

      it "returns the proper documents:, pay stubs, and written child support statement" do

        expect(documents.size).to eq 2
        expect(document_names).to eq ["Pay Stubs", "Written Child Support Statement"]

      end

    end

    describe "multi-member household with 1 retired person, 1 employee," \
             "and 1 disabled person" do

      let(:benefits_application) {
        MULTI_MEMBER_HOUSEHOLD_WITH_RETIREE_DISABLED_AND_WORKING
      }

      it "returns the proper documents for each person:" \
         "award letter for retired person, award letter for disabled person," \
         "pay stubs for employee" do

        expect(document_names_per_person).to eq [
          ["Award Letter from Social Security"],
          ["Award Letter for Disability"],
          ["Pay Stubs"]
        ]

        expect(information_needed_per_person).to eq [
          ["Social Security Number", "Date Of Birth"],
          ["Social Security Number", "Date Of Birth"],
          ["Social Security Number", "Date Of Birth"]
        ]

      end

    end

    describe "multi-member household with 1 person receiving unemployment" \
             "and 1 person working" do

      let(:benefits_application) {
        MULTI_MEMBER_HOUSEHOLD_WITH_UNEMPLOYED_AND_WORKING
      }

      it "returns the proper documents:" \
         "employee should submit pay stubs," \
         "unemployed person should submit award letter for unemployment," do

        expect(document_names_per_person).to eq [
          ["Award Letter for Unemployment"],
          ["Pay Stubs"]
        ]

        expect(information_needed_per_person).to eq [
          ["Social Security Number", "Date Of Birth"],
          ["Social Security Number", "Date Of Birth"]
        ]

      end

    end

  end

end
