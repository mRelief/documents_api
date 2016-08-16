class SessionStepIncrementer < Struct.new :session

  def increment
    new_session = session.clone

    new_session['step'] = next_step

    return new_session
  end

  def step
    session['step']
  end

  def next_step
    screener_steps[current_step_index + 1]
  end

  def screener_steps
    [
      'initial',
      'housing_question',
      'citizenship_question',
      'employment_question',
      'other_income_sources_question',
      'state_id_question',
      'result',
    ]
  end

  def current_step_index
    screener_steps.index(step)
  end

end
