require_relative "models/household_member"
require_relative "models/residency_documents"
require_relative "helpers/string_parser"
require          "active_support/all"

module Api
  class DocumentsRequest

    def initialize(household_members:,
                   has_rental_income:,
                   renting:,
                   owns_home:,
                   shelter:,
                   living_with_family_or_friends:,
                   all_citizens:
    )

      @household_member = get_household_member_data(household_members)
      @has_rental_income = StringParser.new(has_rental_income).to_boolean
      @renting = StringParser.new(renting).to_boolean
      @owns_home = StringParser.new(owns_home).to_boolean
      @shelter = StringParser.new(shelter).to_boolean
      @living_with_family_or_friends = StringParser.new(living_with_family_or_friends).to_boolean
      @all_citizens = StringParser.new(all_citizens).to_boolean

      raise "Badly formatted request" if @has_rental_income.nil?
    end

    def fetch_documents
      return {
        "residency_documents": residency_documents,
        "identity_documents": identity_documents,
        "citizenship_documents": citizenship_documents,
        "income_documents": income_documents,
      }
    end

    def residency_documents
      return ResidencyDocuments.new(
        renting: @renting,
        owns_home: @owns_home,
        shelter: @shelter,
        living_with_family_or_friends: @living_with_family_or_friends
      ).list
    end

    def identity_documents
      [@household_member.documents_based_on_identity].compact
    end

    def citizenship_documents
      @all_citizens ? [] : [I_90_DOCUMENTATION]
    end

    def income_documents
      @household_member.documents_based_on_income
    end

    def get_household_member_data(data)
      household_member_hash = data.to_a[0][1].symbolize_keys!

      household_member_hash.each_key do |k|
        household_member_hash[k] = StringParser.new(household_member_hash[k]).to_boolean
      end

      return HouseholdMember.new(household_member_hash)
    end

  end
end

