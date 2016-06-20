class HouseholdMember

  def initialize(child_under_18:,
                 is_employed:,
                 disability_benefits:,
                 receiving_child_support:)
    @child_under_18 = child_under_18
    @is_employed = is_employed
    @disability_benefits = disability_benefits
    @receiving_child_support = receiving_child_support
  end

  def benefits_attributes_with_documents
    to_hash.merge({ documents_needed: documents_needed })
  end

  def documents_needed
    [documents_based_on_age, documents_based_on_employment].compact
  end

  private

  def to_hash
    {
      child_under_18: @child_under_18,
      is_employed: @is_employed,
      disability_benefits: @disability_benefits,
      receiving_child_support: @receiving_child_support,
    }
  end

  def documents_based_on_age
    { "official_name": "Social Security Card" } unless @child_under_18
  end

  def documents_based_on_employment
    { "official_name": "Pay Stubs" } if @is_employed
  end

end
