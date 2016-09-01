class ResponseValidator < Struct.new :from, :original_body, :session_count

  def valid?
    return true if body == 'OPTIONS'
    return true if body == 'RESET'
    return true if valid_response?

    return false
  end

  def valid_response?
    question_data[:allow_multiple] ? valid_allow_multiple : valid_allow_one
  end

  def valid_allow_multiple
    return false if body.size > valid_options.size

    body.chars.each do |character|
      return false unless valid_options.include?(character)
    end

    return true
  end

  def valid_allow_one
    return true if question_data[:options].include?(body)
    return false
  end

  def question_data
    @data ||= question_data_by_session_count[session_count]
  end

  def valid_options
    @options ||= question_data[:options]
  end

  def question_data_by_session_count
    return {
      1 => {
        options: ['A', 'B'],
        allow_multiple: false
      },
      2 => {
        options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        allow_multiple: false
      },
      3 => {
        options: ['Y', 'YES', 'N', 'NO'],
        allow_multiple: false
      },
      4 => {
        options: ['A', 'B', 'C', 'D', 'E'],
        allow_multiple: true
      },
      5 => {
        options: ['A', 'B', 'C', 'D'],
        allow_multiple: true
      },
      6 => {
        options: ['Y', 'YES', 'N', 'NO'],
        allow_multiple: false
      }
    }
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
    @cleaned_up_body ||= original_body.upcase.strip
  end

  def message
    'Sorry, we didn\'t recognize that response.'
  end

  def client
    Twilio::REST::Client.new(ENV['account_sid'], ENV['auth_token'])
  end

end
