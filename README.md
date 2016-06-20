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

# Input

```
# Household of family members:

benefits_application: {
  household_members: [
    {
      child_under_18: ... ,
      disability_benefits: ... ,
      is_employed: ... ,
      receiving_child_support: ... ,
    },
    {
      child_under_18: ... ,
      disability_benefits: ... ,
      is_employed: ... ,
      receiving_child_support: ... ,
    },
    {
      child_under_18: ... ,
      disability_benefits: ... ,
      is_employed: ... ,
      receiving_child_support: ... ,
    },
  ],
  is_applying_for_expedited: ...,
  has_rental_income: ...
}
```


# Output - per household

```
household_members: [
  {
    child_under_18: ... ,
    disability_benefits: ... ,
    is_employed: ... ,
    receiving_child_support: ... ,
    documents_needed: [
      { ... DATA FOR SELF EMPLOYMENT DOCUMENTATION ... },
      { ... DATA FOR SOCIAL SECURITY CARD DOCUMENTATION ... },
      { ... DATA FOR AWARD LETTER ... }
    ]
  },
  {
    child_under_18: ... ,
    disability_benefits: ... ,
    is_employed: ... ,
    receiving_child_support: ... ,
    documents_needed: [],
  },
  {
    child_under_18: ... ,
    disability_benefits: ... ,
    is_employed: ... ,
    receiving_child_support: ... ,
    documents_needed: [],
  },
]
```

# Output - per document

```
{
  official_name: ... ,
  accessible_name: ... ,
  description: ... ,
  instructions: ... ,
  examples: ... ,
  images ... ,
  url_to_document: ... ,
  url_to_explaination: ... ,
  contact: {
    name: ... ,
    location: ... ,
    phone_number: ... ,
    website: ...
  }
}
```
