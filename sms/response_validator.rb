class ResponseValidator < Struct.new :from, :body, :session_count

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
        options: ['A', 'B', 'ME', 'JUST ME', 'MY FAMILY', 'ME AND MY FAMILY'],
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
    SendMessage.new(message, from).send
  end

  private

  def message
    question_data[:allow_multiple] ? message_allow_multiple : message_allow_one
  end

  def message_allow_multiple
    'Please select one or more from these options: ' +  valid_options.join(', ') + '.'
  end

  def message_allow_one
    'Please select one of these options: ' + valid_options.join(', ') + '.'
  end

end
