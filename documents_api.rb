require_relative "household_member"
require_relative "string_parser"
require          "active_support/all"

module Api
  class Documents

    def self.fetch_documents(application)
      parse_incoming_application_params(application)

      household_members_with_documents = application[:household_members].map do |household_member|
        HouseholdMember.new(**household_member).documents_and_info_needed
      end

      return {
        "household_members": household_members_with_documents,
        "other_documents_needed": self.other_documents_needed(application)
      }
    end

    def self.other_documents_needed(application)
      other_documents = [residency_documents]

      expedited = application[:is_applying_for_expedited]
      rental_income = application[:has_rental_income]

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

    def self.parse_incoming_application_params(application)
      application.deep_symbolize_keys!

      application[:household_members].each do |person_hash|
        person_hash.each_pair do |key, value|
          person_hash[key] = StringParser.new(value).to_boolean
        end
      end

      application[:is_applying_for_expedited] = StringParser.new(application[:is_applying_for_expedited]).to_boolean
      application[:has_rental_income] = StringParser.new(application[:has_rental_income]).to_boolean
    end

  end
end

