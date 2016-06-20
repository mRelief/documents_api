require_relative "household_member"

module Api
  class Documents

    def self.fetch_documents(application)
      household_members = application[:benefits_application][:household_members]

      household_members_with_documents = household_members.map do |household_member|
        HouseholdMember.new(household_member).benefits_attributes_with_documents
      end

      return {
        "benefits_application": {
          "household_members": household_members_with_documents,
          "other_documents_needed": self.other_documents_needed(application)
        }
      }
    end

    def self.other_documents_needed(application)
      other_documents = []

      expedited = application[:benefits_application][:is_applying_for_expedited]
      rental_income = application[:benefits_application][:has_rental_income]

      other_documents << BANK_STATEMENTS if (expedited || rental_income)

      return other_documents
    end

  end
end

