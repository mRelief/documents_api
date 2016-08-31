require_relative '../helpers/session_unwrapper'
require_relative 'income_documents'
require_relative '../api/residency_documents'

class DocumentResultsMessage < Struct.new :original_session

  def body
    p documents
    session.has_state_id? ? results_with_state_id : results_without_state_id
  end

  def documents
    documents_request = Api::DocumentsRequest.new(
      has_rental_income: original_session['has_rental_income'],
      renting: original_session['renting'],
      owns_home: original_session['owns_home'],
      shelter: original_session['shelter'],
      living_with_family_or_friends: original_session['living_with_family_or_friends'],
      all_citizens: original_session['all_citizens'],
      employee: original_session['employee'],
      disability_benefits: original_session['disability_benefits'],
      child_support: original_session['child_support'],
      self_employed: original_session['self_employed'],
      retired: original_session['retired'],
      unemployment_benefits: original_session['unemployment_benefits'],
    )

    return documents_request.fetch_documents
  end

  private

  # WITH STATE ID #

  def results_with_state_id
    'You will need these documents: ' +
    [state_id, citizenship_docs, income_docs].flatten.compact.join(', ') +
    '.'
  end

  def state_id
    if session.single_person_household?
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
    [citizenship_docs, IncomeDocuments.new(session).documents].flatten.compact
  end

  def residency_options
    'You will need *ONE* of the following to prove residency: ' +
    residency_docs.join(', ') +
    '.'
  end

  def residency_docs
    documents = ResidencyDocuments.new(
      renting: session.renting?,
      owns_home: session.owns_home?,
      shelter: session.shelter?,
      living_with_family_or_friends: session.living_with_family_or_friends?,
    ).documents

    with_names = documents.map { |doc| doc[:official_name] }

    without_state_id = with_names.select { |doc_name| doc_name != 'State ID' }

    return without_state_id
  end

  def identity_options
    return unless needs_identity_docs
    'You will need *ONE* of the following to prove identity: ' +
    identity_docs.join(', ') +
    '.'
  end

  def identity_docs
    [
      'School Photo ID',
      'US Military Card',
      'Voter Registration Card',
      'Birth Certificate'
    ]
  end

  def needs_identity_docs
    !session.employee? &&
    !session.self_employed? &&
    !session.disability_benefits? &&
    !session.child_support? &&
    !session.unemployment_benefits?
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
    IncomeDocuments.new(session).documents
  end

  def citizenship_docs
    'I-90 Documentation for all non-citizen family members' unless session.all_citizens?
  end

  def session
    @unwrapped_session ||= SessionUnwrapper.new(original_session)
  end

end
