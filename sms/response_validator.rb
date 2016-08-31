class ResponseValidator < Struct.new :from, :original_body

  def invalid?
    return false if body == 'OPTIONS'
    return false if body.include? 'A'
    return false if body.include? 'B'
    return false if body.include? 'C'
    return false if body.include? 'D'
    return false if body == 'E'
    return false if body == 'F'
    return false if body == 'G'
    return false if body == 'Y'
    return false if body == 'YES'
    return false if body == 'N'
    return false if body == 'NO'
    return true
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
