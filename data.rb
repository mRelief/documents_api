PAY_STUBS = {
  official_name: "Pay Stubs",
  accessible_name: "Pay Stubs",
  description: "A document describing your income before taxes are taken out",
  instructions: {
    text: "If you don't get paystubs from your employer," \
          " SNAP office will send your employer a letter.",
    urls: []
  },
  examples: [],
  images: [],
  url_to_document: nil,
  url_to_explaination: nil,
  contact: {
    name: "IL Department of Human Services",
    location: nil,
    phone_number: "800-843-6154",
    url: "www.dhs.state.il.us"
  }
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
  url_to_explaination: nil,
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
}.freeze
