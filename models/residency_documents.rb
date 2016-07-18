class ResidencyDocuments

  def self.list
    return {
      name: "Residency",
      number_needed: 1,
      documents: [
        DRIVERS_LICENSE,
        MAIL,
        RENT_RECEIPT,
        HOMELESS_SHELTER_STATEMENT,
        MEDICAL_RECORDS,
        HOME_OWNERS_INSURANCE,
        PROPERTY_TAX_BILL
      ]
    }
  end

end
