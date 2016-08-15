require_relative 'sms_screener_questions'

class IncomingMessageHandler < Struct.new :from, :body, :session

  def respond
    client.messages.create(
      from: ENV['twilio_number'],
      to: from,
      body: message
    )
  end

  def next_step
    screener_steps[current_step_index + 1]
  end

  private

  def step
    session["step"]
  end

  def message
    return 'Here is your result!' if step == 'result'
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
