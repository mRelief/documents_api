PAY_STUBS = {
  official_name: "Pay Stubs",
  accessible_name: "Pay Stubs",
  description: "A document describing your income before taxes are taken out",
  instructions: {
    text: "If you don't get paystubs from your employer," \
          " SNAP office will automatically send your employer a letter.",
    urls: []
  },
  examples: [],
  images: [],
  url_to_document: nil,
  url_to_explanation: nil,
  contact: {
    name: "IL Department of Human Services",
    location: nil,
    phone_number: "800-843-6154",
    url: "www.dhs.state.il.us"
  }
}.freeze

SOCIAL_SECURITY_NUMBER = {
  official_name: "Social Security Number",
  accessible_name: "Social Security Number",
  instructions: {
    text: "You may need to bring in your Social Secuity Card " \
    "if the office is unable to verify your number.",
  }
}.freeze

DATE_OF_BIRTH = {
  official_name: "Date Of Birth",
  accessible_name: "Date Of Birth",
}.freeze

SOCIAL_SECURITY_CARD = {
  official_name: "Social Security Card",
  accessible_name: "Social Security Card",
  description: "A Social Security card is a wallet-sized piece of paper" \
               " containing a nine-digit unique number issued to U.S. citizens," \
               " permanent residents, and temporary (working) residents.",
  instructions: {
    text: "To replace your card, you need to have original copies of documents" \
          " proving your citizenship, age, and identity. More info can be found" \
          " at these websites:",
    urls: [
      "https://www.ssa.gov/ssnumber/ss5doc.htm",
      "https://www.ssa.gov/forms/ss-5.pdf"
    ]
  },
  examples: [],
  images: [],
  url_to_document: nil,
  url_to_explanation: nil,
  contact: {
    name: nil,
    location: nil,
    phone_number: nil,
    url: "https://secure.ssa.gov/ICON/main.jsp#officeResults"
  }
}.freeze

BANK_STATEMENTS = {
  official_name: "Bank Statements",
  accessible_name: "Bank Statements",
  description: "A document showing the amount of money in your bank account.",
  instructions: {
    text: "If you don't have a recent bank statement," \
          "contact your bank.",
    urls: []
  },
  examples: [],
  images: [],
  url_to_document: nil,
  url_to_explanation: nil,
}.freeze

SELF_EMPLOYMENT_FORM = {
  official_name: "Self-Employment Form",
  accessible_name: "Self-Employment Form",
  description: "A form that contains the number of hours you worked and amount spent. " \
                "The official name is Form IL 2790.",
  instructions: {},
  examples: [],
  images: [],
  url_to_document: nil,
  url_to_explanation: nil,
  contact: {
    name: nil,
    location: nil,
    phone_number: nil,
    url: nil,
  }
}.freeze

WRITTEN_CHILD_SUPPORT_STATEMENT = {
  official_name: "Written Child Support Statement",
  accessible_name: "Written Child Support Statement",
  description: "Written statement from your partner that they're paying child support",
  instructions: {},
  examples: [],
  images: [],
  url_to_document: nil,
  url_to_explanation: nil,
  contact: {
    name: nil,
    location: nil,
    phone_number: nil,
    url: nil,
  }
}.freeze

AWARD_LETTER_FOR_DISABILITY = {
  official_name: "Award Letter for Disability",
  accessible_name: "Award Letter for Disability",
  description: "Proof that you receive disability benefits.",
  instructions: {
    text: nil,
    urls: []
  },
  examples: [],
  images: [],
  url_to_document: nil,
  url_to_explanation: nil,
  contact: {
    name: nil,
    location: nil,
    phone_number: nil,
    url: nil,
  }
}.freeze

AWARD_LETTER_FOR_SOCIAL_SECURITY = {
  official_name: "Award Letter from Social Security",
  accessible_name: "Award Letter for Social Security",
  description: "Proof that you receive Social Security benefits.",
  instructions: {
    text: nil,
    urls: [
    ]
  },
  examples: [],
  images: [],
  url_to_document: nil,
  url_to_explanation: nil,
  contact: {
    name: nil,
    location: nil,
    phone_number: "1-800-772-1213",
    url: nil,
  }
}.freeze

AWARD_LETTER_FOR_UNEMPLOYMENT = {
  official_name: "Award Letter for Unemployment",
  accessible_name: "Award Letter for Unemployment",
  description: "A Social Security card is a wallet-sized piece of paper",
  instructions: {
    text: "Be sure to submit the most recent letter you that you received" \
    "within the past thirty days",
    urls: []
  },
  examples: [],
  images: [],
  url_to_document: nil,
  url_to_explanation: nil,
  contact: {
    name: nil,
    location: nil,
    phone_number: nil,
    url: nil,
  }
}.freeze

DRIVERS_LICENSE = {
  official_name: "Driver's License",
  description: "Valid Illinois Driver's License",
}.freeze

RENT_RECEIPT = {
  official_name: "Rent Receipt",
  description: "Rent, Lease or mortgage receipt",
}.freeze

HOMELESS_SHELTER_STATEMENT = {
  official_name: "Homeless Shelter Statement",
  description: "Statement from homeless shelter",
}.freeze

EMPLOYMENT_RECORDS = {
  official_name: "Employment Records",
}.freeze

MAIL = {
  official_name: "Mail",
  description: "Mail document showing postmark within last 30 days with Illinois address"
}.freeze

MEDICAL_RECORDS = {
  official_name: "Medical Records",
  description: "Medical records/clinic cards"
}.freeze

HOME_OWNERS_INSURANCE = {
  official_name: "Home Owners Insurance",
}.freeze

PROPERTY_TAX_BILL = {
  official_name: "Property Tax Bill",
}.freeze

SCHOOL_ENROLLMENT_RECORDS = {
  official_name: "School Enrollment Records",
}.freeze

OTHER_ID = {
  official_name: "Other ID",
  description: "Other ID with a name and address"
}.freeze