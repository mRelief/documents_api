require_relative '../helpers/string_parser'
require_relative '../api/residency_documents'

class DocumentResultsMessage < Struct.new :session

  def body
    fetch_documents
    has_state_id? ? results_with_state_id : results_without_state_id
  end

  def fetch_documents
    documents_request = Api::DocumentsRequest.new(
      has_rental_income: session['has_rental_income'],
      renting: session['renting'],
      owns_home: session['owns_home'],
      shelter: session['shelter'],
      living_with_family_or_friends: session['living_with_family_or_friends'],
      all_citizens: session['all_citizens'],
      employee: session['employee'],
      disability_benefits: session['disability_benefits'],
      child_support: session['child_support'],
      self_employed: session['self_employed'],
      retired: session['retired'],
      unemployment_benefits: session['unemployment_benefits'],
      recently_lost_job_and_received_paycheck: session['recently_lost_job_and_received_paycheck'],
      has_birth_certificate: session['has_birth_certificate'],
      has_social_security_card: session['has_social_security_card'],
    )

    @document_results = documents_request.fetch_documents

    return @document_results
  end

  private

  # WITH STATE ID #

  def results_with_state_id
    'You will need these documents to complete your Food Stamps application: ' +
    [state_id, citizenship_docs, income_docs].flatten.compact.join(', ') +
    '.'
  end

  def state_id
    if single_person_household?
      'State ID'
    else
      'State IDs for everyone you are applying for'
    end
  end


  # WITHOUT STATE ID #

  def results_without_state_id
    [
      no_state_id_statement,
      residency_options,
      identity_options,
      citizenship_plus_income_section
    ].compact.join(' ')
  end

  def no_state_id_statement
    return 'Since you don\'t have a State ID, you will need to prove residency.' unless needs_identity_docs
    return 'Since you don\'t have a State ID, you will need to prove residency and identity.'
  end

  def citizenship_plus_income_docs
    [citizenship_docs, income_docs].flatten.compact
  end

  def residency_options
    'You will need *ONE* of the following to prove residency: ' +
    residency_docs.join(', ') +
    '.'
  end

  def residency_docs
    @document_results[:residency_documents].map { |doc| doc[:official_name] }
                                           .select { |doc_name| doc_name != 'State ID' }
  end

  def identity_options
    return unless needs_identity_docs
    'You will need *ONE* of the following to prove identity: ' +
    identity_docs.join(', ') +
    '.'
  end

  def identity_docs
    @document_results[:identity_documents].map { |doc| doc[:official_name] }
                                          .select { |doc_name| doc_name != 'State ID' }
  end

  def needs_identity_docs
    @document_results[:identity_documents].size > 0
  end

  def citizenship_plus_income_section
    return if citizenship_plus_income_docs.size == 0

    return ('You will also need a ' + citizenship_plus_income_docs.first + '.') if citizenship_plus_income_docs.size == 1

    return 'You will also need these documents: ' + [
      citizenship_docs,
      income_docs
    ].flatten.compact.join(', ') + '.'
  end


  # SHARED BY BOTH #

  def income_docs
    @document_results[:income_documents].map { |doc| doc[:official_name] }
  end

  def citizenship_docs
    citizenship_results = @document_results[:citizenship_documents]

    return if citizenship_results == []
    return citizenship_results.map { |doc| doc[:official_name] }
  end

  def has_state_id?
    StringParser.new(session['has_state_id']).to_boolean
  end

  def single_person_household?
    StringParser.new(session['single_person_household']).to_boolean
  end

end
