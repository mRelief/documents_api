class IncomingMessageHandler < Struct.new :from, :body, :step

  def client
    Twilio::REST::Client.new(ENV['account_sid'], ENV['auth_token'])
  end

  def welcome_message
    'Welcome. Here you can find out what documents you need to apply for Food Stamps. '
  end

  def first_question
    'How many people are you applying for? A. Just Me. B. My Family.'
  end

  def housing_question
    'Describe your living situation: ' +
    'A. Renting' +
    'B. Own home' +
    'C. Living with family/friends' +
    'D. Shelter' +
    'E. None of the above'
  end

  def message
    if step == "initial"
      welcome_message + first_question
    elsif step == "housing"
      housing_question
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
