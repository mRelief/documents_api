require_relative '../helpers/string_parser'
require_relative '../api/residency_documents'

class DocumentResultsMessage < Struct.new :document_results, :single_person_household

  def body
    [required_documents_message, suggested_documents_message].compact.join(' ')
  end

  private

  def required_documents_message
    [
      all_of_the_above_documents_list,
      residency_documents_list,
      alternative_identity_documents_list,
    ].compact.map { |sentence| sentence + '.' }.join(' ')
  end

  def suggested_documents_message
    return if !has_state_id
    return if (!has_birth_certificate && !has_social_security_card)

    document_description_hash = {
      has_birth_certificate: 'a Birth Certificate',
      has_social_security_card: 'a Social Security Card'
    }

    suggested_documents_list =  []
    suggested_documents_list << 'a Birth Certificate' if has_birth_certificate
    suggested_documents_list << 'a Social Security Card' if has_social_security_card

    suggested_documents = suggested_documents_list.join(' and ')

    return "Since you have #{suggested_documents}, bring them just in case they are needed."
  end

  def all_of_the_above_documents_list
    return if (income_documents.size == 0 &&
               citizenship_documents.size == 0 &&
               !has_birth_certificate &&
               !has_social_security_card &&
               !has_state_id)

    'You will need these documents to complete your Food Stamps application: ' +
      [
        suggested_identity_documents,
        citizenship_documents,
        income_documents,
      ].compact.flatten.join(', ')
  end

  def suggested_identity_documents
    return 'State ID' if has_state_id && single_person_household
    return 'State IDs for everyone you are applying for' if has_state_id && !single_person_household
    return ['Birth Certificate', 'Social Security Card'] if has_birth_certificate &&
                                                            has_social_security_card
    return 'Birth Certificate' if has_birth_certificate
    return 'Social Security Card' if has_social_security_card
  end

  def residency_documents_list
    return if has_state_id

    'You will need *ONE* of these documents to prove residency: ' + residency_documents.join(', ')
  end

  def alternative_identity_documents_list
    return if (has_state_id || has_birth_certificate || has_social_security_card)
    return if (identity_documents.size == 0)
    'You will need *ONE* of these documents to prove identityq: ' + identity_documents.join(', ')
  end

  def identity_documents
    document_results[:identity_documents]
  end

  def citizenship_documents
    document_results[:citizenship_documents]
  end

  def income_documents
    document_results[:income_documents]
  end

  def residency_documents
    document_results[:residency_documents]
  end

  def has_birth_certificate
    identity_documents.include? 'Birth Certificate'
  end

  def has_social_security_card
    identity_documents.include? 'Social Security Card'
  end

  def has_state_id
    identity_documents.include? 'State ID'
  end

end
