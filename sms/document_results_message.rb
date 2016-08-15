require_relative '../helpers/session_unwrapper'

class DocumentResultsMessage < Struct.new :original_session

  def body
    session.has_state_id? ? results_with_state_id : results_without_state_id
  end

  private

  def results_with_state_id
    'You will need these documents: ' +
    [state_id, citizenship_docs, income_docs].flatten.compact.join(', ') +
    '.'
  end

  def results_without_state_id
    return
  end

  def state_id
    if session.single_person_household?
      'State ID'
    else
      'State IDs for everyone you are applying for'
    end
  end

  def income_docs_list
    income_docs.join(', ')
  end

  def income_docs
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

  def session
    @unwrapped_session ||= SessionUnwrapper.new(original_session)
  end

end
