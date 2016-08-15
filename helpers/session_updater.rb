class SessionUpdater < Struct.new :session, :body, :next_step

  def update
    new_session = session.clone

    case new_session['step']
    when 'initial'
      new_session['single_person_household'] = 'false' if body.upcase == 'B'
    when 'housing_question'
      new_session['renting'] = 'true' if body.upcase == 'A'
      new_session['owns_home'] = 'true' if body.upcase == 'B'
      new_session['living_with_family_or_friends'] = 'true' if body.upcase == 'C'
      new_session['shelter'] = 'true' if body.upcase == 'D'
    when 'citizenship_question'
      new_session['all_citizens'] = 'false' if body.upcase == 'NO'
    when 'overall_income_question'
    when 'employment_question'
      new_session['employee'] = 'true' if body.upcase == 'A'
      new_session['self_employed'] = 'true' if body.upcase == 'B'
      new_session['retired'] = 'true' if body.upcase == 'C'
      new_session['unemployment_benefits'] = 'true' if body.upcase == 'D'
    when 'other_income_sources_question'
      new_session['disability_benefits'] = 'true' if body.upcase == 'A'
      new_session['child_support'] = 'true' if body.upcase == 'B'
      new_session['has_rental_income'] = 'true' if body.upcase == 'C'
    when 'state_id_question'
      new_session['has_state_id'] = 'false' if body.upcase == 'NO'
    end

    new_session['step'] = next_step

    return new_session
  end

end
