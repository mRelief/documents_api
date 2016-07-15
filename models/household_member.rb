require_relative "../load_documents_data"

class HouseholdMember

  def initialize(child_under_18:,
                 is_employee:,
                 disability_benefits:,    # Could be from different sources, including Social Security.
                 receiving_child_support:,
                 self_employed:,
                 is_retired:,
                 receiving_unemployment_benefits:)

    @child_under_18 = child_under_18
    @is_employee = is_employee
    @self_employed = self_employed
    @disability_benefits = disability_benefits
    @receiving_child_support = receiving_child_support
    @is_retired = is_retired
    @receiving_unemployment_benefits = receiving_unemployment_benefits
    raise "Invalid data types" unless valid_types?
  end

  def attribute_types
    [ @child_under_18, @is_employee, @self_employed,
      @disability_benefits, @receiving_child_support,
      @is_retired, @receiving_unemployment_benefits ].map { |attribute| attribute.class }
  end

  def valid_types?
    attribute_types.all? do |class_type|
      (class_type == TrueClass) || (class_type == FalseClass)
    end
  end

  def documents_and_info_needed
    to_hash.merge({
      documents_needed: documents_needed,
      information_needed: information_needed,
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
      SOCIAL_SECURITY_CARD
    ].compact
  end

  def information_needed
    [ DATE_OF_BIRTH ]
  end

  private

  def to_hash
    {
      child_under_18: @child_under_18,
      is_employee: @is_employee,
      self_employed: @self_employed,
      disability_benefits: @disability_benefits,
      receiving_child_support: @receiving_child_support,
      is_retired: @is_retired,
      receiving_unemployment_benefits: @receiving_unemployment_benefits,
    }
  end

  def documents_based_on_employment
    PAY_STUBS if @is_employee
  end

  def documents_based_on_self_employment
    SELF_EMPLOYMENT_FORM if @self_employed
  end

  def documents_based_on_child_support
    WRITTEN_CHILD_SUPPORT_STATEMENT if @receiving_child_support
  end

  def documents_based_on_disability
    AWARD_LETTER_FOR_DISABILITY if @disability_benefits
  end

  def documents_based_on_retirement
    AWARD_LETTER_FOR_SOCIAL_SECURITY if @is_retired
  end

  def documents_based_on_unemployment
    AWARD_LETTER_FOR_UNEMPLOYMENT if @receiving_unemployment_benefits
  end

end
