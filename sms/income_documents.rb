class IncomeDocuments < Struct.new :unwrapped_session

  def documents
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

  private

  def documents_based_on_employment
    'Pay Stubs' if unwrapped_session.employee?
  end

  def documents_based_on_self_employment
    'Self-Employment Form' if unwrapped_session.self_employed?
  end

  def documents_based_on_child_support
    'Written Child Support Statement' if unwrapped_session.child_support?
  end

  def documents_based_on_disability
    'Award Letter for Disability' if unwrapped_session.disability_benefits?
  end

  def documents_based_on_retirement
    'Award Letter from Social Security' if unwrapped_session.retired?
  end

  def documents_based_on_unemployment
    'Award Letter for Unemployment' if unwrapped_session.unemployment_benefits?
  end

  def documents_based_on_rental_income
    'Bank Statements' if unwrapped_session.has_rental_income?
  end

end
