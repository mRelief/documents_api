class ResidencyDocuments

  def initialize(renting:,
                 owns_home:,
                 shelter:,
                 living_with_family_or_friends:,
                 has_state_id:)

    @renting = renting
    @owns_home = owns_home
    @shelter = shelter
    @living_with_family_or_friends = living_with_family_or_friends
    @has_state_id = has_state_id
  end

  def documents
    [
      state_id,
      rental_documents,
      homeowner_documents,
      shelter_documents,
      living_with_family_or_friends_documents,
      MAIL,
      MEDICAL_RECORDS,
    ].flatten.compact
  end

  def state_id
    STATE_ID if @has_state_id
  end

  def rental_documents
    RENT_RECEIPT if @renting
  end

  def homeowner_documents
    [HOME_OWNERS_INSURANCE, PROPERTY_TAX_BILL] if @owns_home
  end

  def shelter_documents
    HOMELESS_SHELTER_STATEMENT if @shelter
  end

  def living_with_family_or_friends_documents
    LETTER_FROM_FAMILY_OR_FRIEND if @living_with_family_or_friends
  end

end
