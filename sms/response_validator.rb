class ResponseValidator < Struct.new :from, :original_body, :session

  def valid?
    return true if body == 'OPTIONS'
    return true if body.include? 'A'
    return true if body.include? 'B'
    return true if body.include? 'C'
    return true if body.include? 'D'
    return true if body == 'E'
    return true if body == 'F'
    return true if body == 'G'
    return true if body == 'Y'
    return true if body == 'YES'
    return true if body == 'N'
    return true if body == 'NO'
    return true if body == 'RESET'
    return false
  end

  def respond_to_invalid!
    client.messages.create(
      from: ENV['twilio_number'],
      to: from,
      body: message
    )

    return message
  end

  private

  def body
    original_body.upcase.strip
  end

  def message
    'Sorry, we didn\'t recognize that response.'
  end

  def client
    Twilio::REST::Client.new(ENV['account_sid'], ENV['auth_token'])
  end

end
