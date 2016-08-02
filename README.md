[![Build Status](https://travis-ci.org/mRelief/documents_api.svg)](https://travis-ci.org/mRelief/documents_api)

# About

This is a prototype API to help families applying for public assistance understand the documents they need to submit with their application.

# Public assistance progams

Our goal is to start with documents needed to apply for Illinois SNAP.

Data sources:

+ [Illinois SNAP Guidelines](http://www.dhs.state.il.us/OneNetLibrary/27897/documents/Brochures/124D.pdf)
+ Interviews with SNAP administration staff

# API consumers

If you build social services-related technology and are interested in using this API, please contact [Rose](mailto:rose@mrelief.com) or [Genevieve](mailto:genevieve@mrelief.com).

# Run the app

```
rerun 'ruby app.rb'
```

# Run the tests

```
rspec spec
```

# Input

```
# Household of family members:

{
  household_members: [ ... ],
  has_rental_income: ...,             # Does the household have any rental income?
  renting: ...,                       # Is the household renting?
  owns_home: ...,                     # Is this a homeowning household?
  shelter: ...,                       # Does the household stay in a shelter?
  living_with_family_or_friends: ..., # Is the household living with family or friends?
  all_citizens: ...,                  # Are all household members citizens?
}
```


# Output - per household

```
{
  household_members: [
    {
      documents_needed: [
        { ... DATA FOR SELF EMPLOYMENT DOCUMENTATION ... },
        { ... DATA FOR SOCIAL SECURITY CARD DOCUMENTATION ... },
        { ... DATA FOR AWARD LETTER ... },
      ],
    },
    {
      documents_needed: [ ... ],
    },
    {
      documents_needed: [ ... ],
    },
  ],
  other_documents_needed: [
    { ... DATA FOR DOCUMENT 1 ... },
    { ... DATA FOR DOCUMENT 2 ... },

    // One document from the following list ...

    {
      name: "Residency",
      number_needed: 1,
      documents: [
        { ... DATA FOR DOCUMENT 3 ... },
        { ... DATA FOR DOCUMENT 4 ... },
        { ... DATA FOR DOCUMENT 5 ... },
        { ... DATA FOR DOCUMENT 6 ... },
      ]
    }
  ]
}
```

# Data structure for documents

See `data.rb` for examples.

This is a work in progress.

Structure:

```
{
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
  url_to_explanation: nil,
  contact: {
    name: "IL Department of Human Services",
    location: nil,
    phone_number: "800-843-6154",
    url: "www.dhs.state.il.us"
  }
}
```
