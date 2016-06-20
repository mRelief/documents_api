require_relative "data"

class HouseholdMember

  def initialize(child_under_18:,
                 is_employee:,
                 disability_benefits:,
                 receiving_child_support:,
                 self_employed:,
                 is_retired:)

    @child_under_18 = child_under_18
    @is_employee = is_employee
    @self_employed = self_employed
    @disability_benefits = disability_benefits
    @receiving_child_support = receiving_child_support
    @is_retired = is_retired
  end

  def benefits_attributes_with_documents
    to_hash.merge({ documents_needed: documents_needed })
  end

  def documents_needed
    [
      documents_based_on_age,
      documents_based_on_employment,
      documents_based_on_self_employment,
      documents_based_on_child_support,
      documents_based_on_disability,
      documents_based_on_retirement,
    ].compact
  end

  private

  def to_hash
    {
      child_under_18: @child_under_18,
      is_employee: @is_employee,
      self_employed: @self_employed,
      disability_benefits: @disability_benefits,
      receiving_child_support: @receiving_child_support,
      is_retired: @is_retired
    }
  end

  def documents_based_on_age
    SOCIAL_SECURITY_CARD unless @child_under_18
  end

  def documents_based_on_employment
    PAY_STUBS if @is_employee
  end

  def documents_based_on_self_employment
    { "official_name": "Self-Employment Form" } if @self_employed
  end

  def documents_based_on_child_support
    { "official_name": "Written Statement" } if @receiving_child_support
  end

  def documents_based_on_disability
    { "official_name": "Award Letter for Disability" } if @disability_benefits
  end

  def documents_based_on_retirement
    { "official_name": "Award Letter from Social Security" } if @is_retired
  end

end
