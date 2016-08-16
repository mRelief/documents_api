require_relative 'document_results_message'
require_relative 'sms_screener_questions'
require_relative '../helpers/session_updater'

class IncomingMessageHandler < Struct.new :from, :original_body, :session

  def respond
    client.messages.create(
      from: ENV['twilio_number'],
      to: from,
      body: message
    )

    return message
  end

  def updated_session
    @new_session = SessionUpdater.new(session, body, next_step).update
    return @new_session
  end

  def next_step
    return screener_steps[0] if body == 'RESET'
    return screener_steps[current_step_index + 1]
  end

  private

  def step
    session['step']
  end

  def body
    original_body.upcase
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
