require_relative 'helpers/session_unwrapper'

class DocumentResultsMessage < Struct.new :original_session

  def body
    state_id_section
  end

  private

  def state_id_section
    if session.single_person_household?
      state_id_solo
    else
      state_id_household
    end
  end

  def state_id_household
    'You will need a State ID for all adult members of your household.'
  end

  def state_id_solo
    'You will need your State ID.'
  end

  def session
    @unwrapped_session ||= SessionUnwrapper.new(original_session)
  end

end
