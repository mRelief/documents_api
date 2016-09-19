require_relative 'document_results_message'
require_relative 'sms_screener_questions'

class Responder < Struct.new :from, :session

  def respond
    SendMessage.new(message, from).send
  end

  private

  def send_results?
    session[:count] == 8
  end

  def step
    session[:count]
  end

  def message
    if send_results?
      DocumentResultsMessage.new(session).body
    elsif tiered_question_message(session)
      tiered_question_message(session)
    else
      SMS_SCREENER[step]
    end
  end

  def tiered_question_message(session)
    if session['more_housing_options'] == 'true'
      return 'Here are some more options: E. Car. F. Motel G. In Kind.'
    elsif session['tiered_unemployment_question_one'] == 'true'
      return 'Are you receiving unemployment benefits? Y or N.'
    elsif session['tiered_unemployment_question_two'] == 'true'
      return 'If you recently lost a job, have you received a pay check in the last 30 days? Y or N.'
    end

    return false
  end

end
