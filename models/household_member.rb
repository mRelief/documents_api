require_relative "../load_documents_data"
require_relative "identity_documents"

class HouseholdMember

  def initialize(employee:,
                 disability_benefits:,    # Could be from different sources, including Social Security.
                 child_support:,
                 self_employed:,
                 retired:,
                 unemployment_benefits:)

    @employee = employee
    @self_employed = self_employed
    @disability_benefits = disability_benefits
    @child_support = child_support
    @retired = retired
    @unemployment_benefits = unemployment_benefits
    raise "Invalid data" unless valid_data?
  end

  def attribute_classes
    [ @employee, @self_employed,
      @disability_benefits, @child_support,
      @retired, @unemployment_benefits ].map { |attribute| attribute.class }
  end

  def valid_data?
    attribute_classes.all? do |class_type|
      (class_type == TrueClass) || (class_type == FalseClass)
    end
  end

  def documents_and_info_needed
    to_hash.merge({
      documents_needed: documents_needed,
      needs_identity_docs: needs_identity_docs?
    })
  end

  def documents_needed
    [
      documents_based_on_employment,
      documents_based_on_self_employment,
      documents_based_on_child_support,
      documents_based_on_disability,
      documents_based_on_retirement,
      documents_based_on_unemployment,
      documents_based_on_identity,
    ].compact
  end

  def to_hash
    {
      employee: @employee,
      self_employed: @self_employed,
      disability_benefits: @disability_benefits,
      child_support: @child_support,
      retired: @retired,
      unemployment_benefits: @unemployment_benefits,
    }
  end

  def documents_based_on_employment
    PAY_STUBS if @employee
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

  def needs_identity_docs?
    !@employee &&
    !@self_employed &&
    !@disability_benefits &&
    !@child_support &&
    !@unemployment_benefits
  end

  def documents_based_on_identity
    IdentityDocuments.list if needs_identity_docs?
  end

end
