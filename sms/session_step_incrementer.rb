class SessionStepIncrementer < Struct.new :session

  def increment
    new_session = session.clone

    if new_session['more_housing_options'] == 'true'                  # Tiered question
      new_session['more_housing_options'] = 'false'
    elsif (new_session['tiered_unemployment_question_one'] == 'true' ||
           new_session['tiered_unemployment_question_two'] == 'true')
      nil
    elsif 6 > new_session[:count]
      new_session[:count] += 1
    else
      new_session[:count] = 0
    end

    return new_session
  end

end
