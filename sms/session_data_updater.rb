class SessionDataUpdater < Struct.new :session, :original_body

  def update_data
    new_session = session.clone

    return new_session if new_session[:count] == 0

    case new_session[:count]
    when 1
      new_session['single_person_household'] = 'false' if body.include? 'B'
    when 2
      new_session['renting'] = 'true' if body.include? 'A'
      new_session['owns_home'] = 'true' if body.include? 'B'
      new_session['living_with_family_or_friends'] = 'true' if body.include? 'C'
      new_session['shelter'] = 'true' if body.include? 'D'
    when 3
      new_session['all_citizens'] = 'false' if body[0] == 'N'
    when 4
      new_session['employee'] = 'true' if body.include? 'A'
      new_session['self_employed'] = 'true' if body.include? 'B'
      new_session['retired'] = 'true' if body.include? 'C'
      new_session['unemployment_benefits'] = 'true' if body.include? 'D'
    when 5
      new_session['disability_benefits'] = 'true' if body.include? 'A'
      new_session['child_support'] = 'true' if body.include? 'B'
      new_session['has_rental_income'] = 'true' if body.include? 'C'
    when 6
      new_session['has_state_id'] = 'false' if body[0] == 'N'
    end

    return new_session
  end

  def body
    original_body.upcase
  end

end
