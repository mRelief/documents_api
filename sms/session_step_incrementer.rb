class SessionStepIncrementer < Struct.new :session

  def increment
    new_session = session.clone

    new_session[:count] += 1

    return new_session
  end

end
