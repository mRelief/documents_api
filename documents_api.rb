require_relative "models/household_member"
require_relative "models/residency_documents"
require_relative "helpers/string_parser"
require          "active_support/all"

module Api
  class DocumentsRequest

    def initialize(household_members:,
                   is_applying_for_expedited:,
                   has_rental_income:,
                   renting:,
                   owns_home:,
                   shelter:)

      @household_members = reformat_household_members(household_members)
      @is_applying_for_expedited = StringParser.new(is_applying_for_expedited).to_boolean
      @has_rental_income = StringParser.new(has_rental_income).to_boolean
      @renting = StringParser.new(renting).to_boolean
      @owns_home = StringParser.new(owns_home).to_boolean
      @shelter = StringParser.new(shelter).to_boolean

      raise "Badly formatted request" if @is_applying_for_expedited.nil? || @has_rental_income.nil?
    end

    def fetch_documents
      household_with_docs = @household_members.map { |person| person.documents_and_info_needed }

      return {
        "household_members": household_with_docs,
        "other_documents_needed": other_documents_needed
      }
    end

    def residency_documents
      return ResidencyDocuments.new(
        renting: @renting, owns_home: @owns_home, shelter: @shelter
      )
    end

    def other_documents_needed
      other_documents = [residency_documents.list]

      other_documents << BANK_STATEMENTS if (@is_applying_for_expedited || @has_rental_income)

      return other_documents
    end

    def reformat_household_members(household_members)
      # NOTE: This is only written to handle a single household member.
      #       Larger households come later since the V1 prototype is about a
      #       single-member household.

      household_member_hash = household_members.to_a[0][1].symbolize_keys!

      household_member_hash.each_key do |k|
        household_member_hash[k] = StringParser.new(household_member_hash[k]).to_boolean
      end

      [HouseholdMember.new(household_member_hash)]
    end

  end
end

