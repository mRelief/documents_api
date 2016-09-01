class ResponseValidator < Struct.new :from, :original_body, :session_count

  def valid?
    return true if body == 'OPTIONS'
    return true if body == 'RESET'

    valid_response = case session_count
    when 1
      valid_for_multiple_choice?
    when 2
      valid_for_multiple_choice?
    when 3
      valid_for_yes_no?
    when 4
      valid_for_multiple_choice?
    when 5
      valid_for_multiple_choice?
    when 6
      valid_for_yes_no?
    end

    return true if valid_response

    return false
  end

  def question_data
    @data ||= question_data_by_session_count[session_count]
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
      }
      6 => {
        options: ['Y', 'YES', 'N', 'NO'],
        allow_multiple: false
      }
    }
  end

  def valid_for_multiple_choice?
    return true if body.include? 'A'
    return true if body.include? 'B'
    return true if body.include? 'C'
    return true if body.include? 'D'
    return true if body == 'E'
    return true if body == 'F'
    return true if body == 'G'
    return false
  end

  def valid_for_yes_no?
    return true if body == 'Y'
    return true if body == 'YES'
    return true if body == 'N'
    return true if body == 'NO'
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
