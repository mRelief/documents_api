class SessionStepIncrementer < Struct.new :session

  def increment
    new_session = session.clone

    if new_session['more_housing_options'] == 'true'
      # Don't double-increment if user was asking for more housing options
      new_session['more_housing_options'] = 'false'
    elsif 6 > new_session[:count]
      new_session[:count] += 1
    else
      new_session[:count] = 0
    end

    return new_session
  end

end
