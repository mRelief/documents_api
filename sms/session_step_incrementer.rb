class SessionStepIncrementer < Struct.new :session

  def increment
    new_session = session.clone

    if 6 > new_session[:count]
      new_session[:count] += 1
    else
      new_session[:count] = 0
    end

    return new_session
  end

end
