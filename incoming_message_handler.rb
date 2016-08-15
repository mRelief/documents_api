require_relative 'sms_screener_questions'

class IncomingMessageHandler < Struct.new :from, :body, :step

  def client
    Twilio::REST::Client.new(ENV['account_sid'], ENV['auth_token'])
  end

  def message
    if step == "initial"
      SMS_SCREENER['welcome_message'] + SMS_SCREENER['first_question']
    elsif step == "housing"
      SMS_SCREENER['housing_question']
    end
  end

  def respond
    client.messages.create(
      from: ENV['twilio_number'],
      to: from,
      body: message
    )
  end

end
