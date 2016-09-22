class SessionDataUpdater < Struct.new :session, :body

  def update_data
    new_session = session.clone

    return new_session if new_session[:count] == 0

    return clean_session if reset?

    return handle_tiered_question(new_session) if tiered_question?(new_session)

    case new_session[:count]
    when 1
      new_session['single_person_household'] = 'false' if body.include? 'B'
      new_session['single_person_household'] = 'false' if body == 'MY FAMILY'
      new_session['single_person_household'] = 'false' if body == 'ME AND MY FAMILY'
    when 2
      new_session['renting'] = 'true' if body.include? 'A'
      new_session['owns_home'] = 'true' if body.include? 'B'
      new_session['living_with_family_or_friends'] = 'true' if body.include? 'C'
      new_session['shelter'] = 'true' if body.include? 'D'
      new_session['more_housing_options'] = 'true' if body.include? 'OPTIONS'
    when 3
      new_session['all_citizens'] = 'false' if body[0] == 'N'
    when 4
      new_session['employee'] = 'true' if body.include? 'A'

      if body.include? 'B'
        new_session['tiered_unemployment_question_one'] = 'true'
        new_session['tiered_unemployment_question_two'] = 'true'
      end

      new_session['retired'] = 'true' if body.include? 'C'
      new_session['self_employed'] = 'true' if body.include? 'D'
    when 5
      new_session['disability_benefits'] = 'true' if body.include? 'A'
      new_session['child_support'] = 'true' if body.include? 'B'
      new_session['has_rental_income'] = 'true' if body.include? 'C'
    when 6
      new_session['has_state_id'] = 'true' if body[0] == 'Y'
    when 7
      new_session['has_birth_certificate'] = 'true' if body[0] == 'Y'
    when 8
      new_session['has_social_security_card'] = 'true' if body[0] == 'Y'
    end

    return new_session
  end

  private

  def handle_tiered_question(new_session)
    if new_session['tiered_unemployment_question_one'] == 'true'
      new_session['unemployment_benefits'] = 'true' if body.include? 'Y'
      new_session['tiered_unemployment_question_one'] = 'false'
    elsif new_session['tiered_unemployment_question_two'] == 'true'
      new_session['recently_lost_job_and_received_paycheck'] = 'true' if body.include? 'Y'
      new_session['tiered_unemployment_question_two'] = 'false'
    end

    return new_session
  end

  def tiered_question?(session)
    session['tiered_unemployment_question_one'] == 'true' ||
    session['tiered_unemployment_question_two'] == 'true'
  end

  def reset?
    body == 'RESET'
  end

  def clean_session
    new_session = session.clone

    new_session['count'] = 0
    new_session['single_person_household'] = 'true'
    new_session['renting'] = 'false'
    new_session['owns_home'] = 'false'
    new_session['shelter'] = 'false'
    new_session['living_with_family_or_friends'] = 'false'
    new_session['all_citizens'] = 'true'
    new_session['employee'] = 'false'
    new_session['self_employed'] = 'false'
    new_session['retired'] = 'false'
    new_session['unemployment_benefits'] = 'false'
    new_session['has_rental_income'] = 'false'
    new_session['disability_benefits'] = 'false'
    new_session['child_support'] = 'false'
    new_session['more_housing_options'] = 'false'
    new_session['recently_lost_job_and_received_paycheck'] = 'false'
    new_session['has_birth_certificate'] = 'false'
    new_session['has_social_security_card'] = 'false'
    new_session['has_state_id'] = 'false'

    return new_session
  end

end
