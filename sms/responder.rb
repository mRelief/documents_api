require_relative 'document_results_message'
require_relative 'sms_screener_questions'

class Responder < Struct.new :from, :session

  def respond
    client.messages.create(
      from: ENV['twilio_number'],
      to: from,
      body: message
    )

    return message
  end

  private

  def send_results?
    session[:count] == 6
  end

  def step
    session[:count]
  end

  def message
    if send_results?
      DocumentResultsMessage.new(session).body
    elsif session['more_housing_options'] == 'true'
      'Here are some more options: E. Car. F. Motel G. In Kind.'
    else
      SMS_SCREENER[step]
    end
  end

  def client
    Twilio::REST::Client.new(ENV['account_sid'], ENV['auth_token'])
  end

end
