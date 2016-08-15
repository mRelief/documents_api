class IncomingMessageHandler < Struct.new :from, :body

  def client
    @client ||= Twilio::REST::Client.new(ENV['account_sid'], ENV['auth_token'])
  end

  def welcome_message
    'Welcome. Here you can find out what documents you need to apply for Food Stamps. '
  end

  def first_question
    'How many people are you applying for? A. Just Me. B. My Family.'
  end

  def respond
    @client.messages.create(
      from: ENV['twilio_number'],
      to: from,
      body: (welcome_message + first_question)
    )
  end

end
