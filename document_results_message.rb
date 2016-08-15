require_relative 'helpers/session_unwrapper'

class DocumentResultsMessage < Struct.new :original_session

  def body
    [
      state_id_section,
      income_docs_section,
      citizenship_docs_question
    ].compact.join(' ')
  end

  private

  def state_id_section
    if session.single_person_household?
      state_id_solo
    else
      state_id_household
    end
  end

  def state_id_household
    'You will need a State ID for all adult members of your household.'
  end

  def state_id_solo
    'You will need your State ID.'
  end

  def income_docs_section
    'You will need all of the following documents:' + income_docs_list
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

  def citizenship_docs_question
    return
  end

  def session
    @unwrapped_session ||= SessionUnwrapper.new(original_session)
  end

end
