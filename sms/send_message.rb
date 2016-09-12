class SendMessage < Struct.new :message, :to

  def send
    client.messages.create(
      from: ENV['twilio_number'],
      to: to,
      body: message
    )

    return message
  end

  def client
    @twilio_client ||= Twilio::REST::Client.new(ENV['account_sid'], ENV['auth_token'])
  end

end
