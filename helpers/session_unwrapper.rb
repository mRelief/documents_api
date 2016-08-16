require_relative 'string_parser'

class SessionUnwrapper < Struct.new :session

  def has_state_id?
    StringParser.new(session['has_state_id']).to_boolean
  end

  def single_person_household?
    StringParser.new(session['single_person_household']).to_boolean
  end

  def renting?
    StringParser.new(session['renting']).to_boolean
  end

  def owns_home?
    StringParser.new(session['owns_home']).to_boolean
  end

  def shelter?
    StringParser.new(session['shelter']).to_boolean
  end

  def living_with_family_or_friends?
    StringParser.new(session['living_with_family_or_friends']).to_boolean
  end

  def all_citizens?
    StringParser.new(session['all_citizens']).to_boolean
  end

  def employee?
    StringParser.new(session['employee']).to_boolean
  end

  def self_employed?
    StringParser.new(session['self_employed']).to_boolean
  end

  def retired?
    StringParser.new(session['retired']).to_boolean
  end

  def unemployment_benefits?
    StringParser.new(session['unemployment_benefits']).to_boolean
  end

  def has_rental_income?
    StringParser.new(session['has_rental_income']).to_boolean
  end

  def disability_benefits?
    StringParser.new(session['disability_benefits']).to_boolean
  end

  def child_support?
    StringParser.new(session['child_support']).to_boolean
  end

end
