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
    'Pay Stubs' if session.employee?
  end

  def documents_based_on_self_employment
    'Self-Employment Form' if session.self_employed?
  end

  def documents_based_on_child_support
    'Written Child Support Statement' if session.child_support?
  end

  def documents_based_on_disability
    'Award Letter for Disability' if session.disability_benefits?
  end

  def documents_based_on_retirement
    'Award Letter from Social Security' if session.retired?
  end

  def documents_based_on_unemployment
    'Award Letter for Unemployment' if session.unemployment_benefits?
  end

  def documents_based_on_rental_income
    'Bank Statements' if session.has_rental_income?
  end

  def citizenship_docs
    'I-90 Documentation for all non-citizen family members' unless session.all_citizens?
  end

end
