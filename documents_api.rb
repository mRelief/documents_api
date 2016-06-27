require_relative "household_member"
require          "active_support/all"

module Api
  class Documents

    def self.fetch_documents(application)
      application.deep_symbolize_keys!
      household_members = application[:benefits_application][:household_members]

      household_members_with_documents = household_members.map do |household_member|
        HouseholdMember.new(**household_member).documents_and_info_needed
      end

      return {
        "household_members": household_members_with_documents,
        "other_documents_needed": self.other_documents_needed(application)
      }
    end

    def self.other_documents_needed(application)
      other_documents = [residency_documents]

      expedited = application[:benefits_application][:is_applying_for_expedited]
      rental_income = application[:benefits_application][:has_rental_income]

      other_documents << BANK_STATEMENTS if (expedited || rental_income)

      return other_documents
    end

    def self.residency_documents
      return {
        name: "Residency",
        number_needed: 1,
        documents: [
          DRIVERS_LICENSE,
          RENT_RECEIPT,
          HOMELESS_SHELTER_STATEMENT,
          EMPLOYMENT_RECORDS,
          MAIL,
          MEDICAL_RECORDS,
          HOME_OWNERS_INSURANCE,
          PROPERTY_TAX_BILL,
          SCHOOL_ENROLLMENT_RECORDS,
          OTHER_ID,
        ]
      }
    end

  end
end

