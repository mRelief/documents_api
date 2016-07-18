class ResidencyDocuments

  def initialize(renting:, owns_home:, shelter:)
    @renting = renting
    @owns_home = owns_home
    @shelter = shelter
  end

  def list
    return {
      name: "Residency",
      number_needed: 1,
      documents: documents
    }
  end

  def documents
    [
      DRIVERS_LICENSE,
      MAIL,
      rental_documents,
      homeowner_documents,
      shelter_documents,
      MEDICAL_RECORDS,
    ].flatten.compact
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

end
