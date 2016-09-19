require_relative "load_documents_data"
require_relative "./residency_documents"
require_relative "../helpers/string_parser"
require          "active_support/all"

module Api
  class DocumentsRequest

    def initialize(has_rental_income:,
                   renting:,
                   owns_home:,
                   shelter:,
                   living_with_family_or_friends:,
                   all_citizens:,
                   employee:,
                   disability_benefits:,
                   child_support:,
                   self_employed:,
                   retired:,
                   unemployment_benefits:,
                   recently_lost_job_and_received_paycheck:,
                   has_birth_certificate:,
                   has_social_security_card:)

      @has_rental_income = StringParser.new(has_rental_income).to_boolean
      @renting = StringParser.new(renting).to_boolean
      @owns_home = StringParser.new(owns_home).to_boolean
      @shelter = StringParser.new(shelter).to_boolean
      @living_with_family_or_friends = StringParser.new(living_with_family_or_friends).to_boolean
      @all_citizens = StringParser.new(all_citizens).to_boolean
      @employee = StringParser.new(employee).to_boolean
      @self_employed = StringParser.new(self_employed).to_boolean
      @disability_benefits = StringParser.new(disability_benefits).to_boolean
      @child_support = StringParser.new(child_support).to_boolean
      @retired = StringParser.new(retired).to_boolean
      @unemployment_benefits = StringParser.new(unemployment_benefits).to_boolean
      @recently_lost_job_and_received_paycheck = StringParser.new(recently_lost_job_and_received_paycheck).to_boolean
      @has_birth_certificate = StringParser.new(has_birth_certificate).to_boolean
      @has_social_security_card = StringParser.new(has_social_security_card).to_boolean

      raise "Invalid data" unless valid_data?
    end

    def fetch_documents
      return {
        "residency_documents": residency_documents,
        "identity_documents": identity_documents,
        "citizenship_documents": citizenship_documents,
        "income_documents": income_documents,
      }
    end

    def fetch_document_names
      return {
        "residency_documents": residency_documents.map { |doc| doc[:official_name] },
        "identity_documents": identity_documents.map { |doc| doc[:official_name] },
        "citizenship_documents": citizenship_documents.map { |doc| doc[:official_name] },
        "income_documents": income_documents.map { |doc| doc[:official_name] },
      }
    end

    private

    ## DATA VALIDATION ##

    def valid_data?
      attribute_classes.all? do |class_type|
        (class_type == TrueClass) || (class_type == FalseClass)
      end
    end

    def attribute_classes
      [
        @has_rental_income,
        @renting,
        @owns_home,
        @shelter,
        @living_with_family_or_friends,
        @all_citizens,
        @employee,
        @self_employed,
        @disability_benefits,
        @child_support,
        @retired,
        @unemployment_benefits,
      ].map { |attribute| attribute.class }
    end


    ## RESIDENCY DOCUMENTS ##

    def residency_documents
      return ResidencyDocuments.new(
        renting: @renting,
        owns_home: @owns_home,
        shelter: @shelter,
        living_with_family_or_friends: @living_with_family_or_friends
      ).documents
    end


    ## IDENTITY DOCUMENTS ##

    def needs_identity_docs
      !@employee &&
      !@self_employed &&
      !@disability_benefits &&
      !@child_support &&
      !@unemployment_benefits
    end

    def identity_documents
      needs_identity_docs ? identity_documents_list : []
    end

    def identity_documents_list
      list = [
        STATE_ID,
        SCHOOL_PHOTO_ID,
        US_MILITARY_CARD,
        VOTER_REGISTRATION_CARD,
      ]

      list << BIRTH_CERTIFICATE if @has_birth_certificate
      list << SOCIAL_SECURITY_CARD if @has_social_security_card

      return list
    end


    ## CITIZENSHIP DOCUMENTS ##

    def citizenship_documents
      @all_citizens ? [] : [I_90_DOCUMENTATION]
    end


    ## INCOME DOCUMENTS ##

    def income_documents
      [
        documents_based_on_employment,
        documents_based_on_self_employment,
        documents_based_on_child_support,
        documents_based_on_disability,
        documents_based_on_retirement,
        documents_based_on_unemployment,
        documents_based_on_rental_income,
      ].compact
    end

    def documents_based_on_employment
      PAY_STUBS if (@employee || @recently_lost_job_and_received_paycheck)
    end

    def documents_based_on_self_employment
      SELF_EMPLOYMENT_FORM if @self_employed
    end

    def documents_based_on_child_support
      WRITTEN_CHILD_SUPPORT_STATEMENT if @child_support
    end

    def documents_based_on_disability
      AWARD_LETTER_FOR_DISABILITY if @disability_benefits
    end

    def documents_based_on_retirement
      AWARD_LETTER_FOR_SOCIAL_SECURITY if @retired
    end

    def documents_based_on_unemployment
      AWARD_LETTER_FOR_UNEMPLOYMENT if @unemployment_benefits
    end

    def documents_based_on_rental_income
      BANK_STATEMENTS if @has_rental_income
    end

  end
end

