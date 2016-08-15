require_relative 'document_results_message'
require_relative 'sms_screener_questions'

class IncomingMessageHandler < Struct.new :from, :body, :session

  def respond
    client.messages.create(
      from: ENV['twilio_number'],
      to: from,
      body: message
    )
  end

  def updated_session
    @new_session = session.clone
    @new_session['step'] = next_step

    case step
    when 'initial'
      @new_session['single_person_household'] = 'false' if body.upcase == 'B'
    when 'housing_question'
      @new_session['renting'] = 'true' if body.upcase == 'A'
      @new_session['owns_home'] = 'true' if body.upcase == 'B'
      @new_session['living_with_family_or_friends'] = 'true' if body.upcase == 'C'
      @new_session['shelter'] = 'true' if body.upcase == 'D'
    when 'citizenship_question'
      @new_session['all_citizens'] = 'false' if body.upcase == 'NO'
    when 'overall_income_question'
    when 'employment_question'
      @new_session['employee'] = 'true' if body.upcase == 'A'
      @new_session['self_employed'] = 'true' if body.upcase == 'B'
      @new_session['retired'] = 'true' if body.upcase == 'C'
      @new_session['unemployment_benefits'] = 'true' if body.upcase == 'D'
    when 'other_income_sources_question'
      @new_session['disability_benefits'] = 'true' if body.upcase == 'A'
      @new_session['child_support'] = 'true' if body.upcase == 'B'
      @new_session['has_rental_income'] = 'true' if body.upcase == 'C'
    when 'state_id_question'
      @new_session['has_state_id'] = 'false' if body.upcase == 'NO'
    end

    return @new_session
  end

  def next_step
    return screener_steps[0] if body.upcase == 'RESET'
    return screener_steps[current_step_index + 1]
  end

  private

  def step
    session['step']
  end

  def message
    return DocumentResultsMessage.new(@new_session).body if step == 'result'
    return SMS_SCREENER[step]
  end

  def screener_steps
    [
      'initial',
      'housing_question',
      'citizenship_question',
      'overall_income_question',
      'employment_question',
      'other_income_sources_question',
      'state_id_question',
      'result',
    ]
  end

  def current_step_index
    screener_steps.index(step)
  end

  def client
    Twilio::REST::Client.new(ENV['account_sid'], ENV['auth_token'])
  end

end
