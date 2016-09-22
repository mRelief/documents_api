require_relative 'document_results_message'
require_relative 'sms_screener_questions'

class Responder < Struct.new :from, :session

  def respond
    SendMessage.new(message, from).send
  end

  private

  def send_results?
    session[:count] == 8
  end

  def step
    session[:count]
  end

  def message
    if send_results?
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
        has_state_id: session['has_state_id'],
      )

      document_results = documents_request.fetch_document_names

      single_person_household = StringParser.new(session['single_person_household']).to_boolean

      DocumentResultsMessage.new(document_results, single_person_household).body
    elsif tiered_question_message(session)
      tiered_question_message(session)
    else
      SMS_SCREENER[step]
    end
  end

  def tiered_question_message(session)
    if session['more_housing_options'] == 'true'
      return 'Here are some more options: E. Car. F. Motel G. In Kind.'
    elsif session['tiered_unemployment_question_one'] == 'true'
      return 'Are you receiving unemployment benefits? Y or N.'
    elsif session['tiered_unemployment_question_two'] == 'true'
      return 'If you recently lost a job, have you received a pay check in the last 30 days? Y or N.'
    end

    return false
  end

end
