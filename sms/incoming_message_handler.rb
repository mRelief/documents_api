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
    SessionUpdater.new(session, body, next_step, previous_step).update
  end

  def next_step
    screener_steps[current_step_index + 1]
  end

  def previous_step
    screener_steps[current_step_index - 1]
  end

  private

  def step
    session['step']
  end

  def send_results?
    step == 'result'
  end

  def body
    original_body.upcase
  end

  def message
    if send_results?
      DocumentResultsMessage.new(session).body
    else
      SMS_SCREENER[step]
    end
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
