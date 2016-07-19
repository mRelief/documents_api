class IdentityDocuments

  def self.list
    return {
      name: "Identity",
      number_needed: 1,
      documents: [
        STATE_ID,
        SCHOOL_PHOTO_ID,
        US_MILITARY_CARD,
        VOTER_REGISTRATION_CARD,
        BIRTH_CERTIFICATE
      ]
    }
  end

end
