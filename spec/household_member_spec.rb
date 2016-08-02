require_relative "../models/household_member"
require_relative "../models/identity_documents"

describe HouseholdMember do

  describe "#documents_needed" do
    context "person has no income" do
      let(:person) {
        HouseholdMember.new(
          is_employee: false,
          disability_benefits: false,
          receiving_child_support: false,
          self_employed: false,
          is_retired: false,
          receiving_unemployment_benefits: false,
        )
      }

      it "person requires identity docs" do
        expect(person.documents_needed.size).to eq 2
        expect(person.documents_needed.first[:name]).to eq "Identity"
        expect(person.documents_needed.second[:official_name]).to eq "Social Security Card"
      end
    end

    context "person receiving disability benefits" do
      let(:person) {
        HouseholdMember.new(
          is_employee: false,
          disability_benefits: true,
          receiving_child_support: false,
          self_employed: false,
          is_retired: false,
          receiving_unemployment_benefits: false,
        )
      }

      it "person does not require identity docs" do
        expect(person.documents_needed.size).to eq 2
        expect(person.documents_needed.first[:official_name]).to eq "Award Letter for Disability"
        expect(person.documents_needed.second[:official_name]).to eq "Social Security Card"
      end
    end
  end

end

