require_relative '../helpers/session_unwrapper'
require_relative 'income_documents'

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
    [no_state_id_statement].join(' ')
  end

  def no_state_id_statement
    'Since you don\'t have a State ID, you will need to prove residency and identity.'
  end

  def state_id
    if session.single_person_household?
      'State ID'
    else
      'State IDs for everyone you are applying for'
    end
  end

  def income_docs_list
    IncomeDocuments.new(session).documents.join(', ')
  end

  def session
    @unwrapped_session ||= SessionUnwrapper.new(original_session)
  end

end
