## Fixtures for specs:

SINGLE_HOUSEHOLD_MEMBER_EMPLOYED = {
  "household_members": [
    {
      "child_under_18": false,
      "disability_benefits": false,
      "is_employee": true,
      "self_employed": false,
      "receiving_child_support": false,
      "is_retired": false,
      "receiving_unemployment_benefits": false,
    }
  ],
  "is_applying_for_expedited": false
}

SINGLE_HOUSEHOLD_MEMBER_SELF_EMPLOYED = {
  "household_members": [
    {
      "child_under_18": false,
      "disability_benefits": false,
      "is_employee": false,
      "self_employed": true,
      "receiving_child_support": false,
      "is_retired": false,
      "receiving_unemployment_benefits": false,
    }
  ],
  "is_applying_for_expedited": false
}

SINGLE_HOUSEHOLD_MEMBER_WITH_RENTAL_INCOME = {
  "household_members": [
    {
      "child_under_18": false,
      "disability_benefits": false,
      "is_employee": false,
      "self_employed": true,
      "receiving_child_support": false,
      "is_retired": false,
      "receiving_unemployment_benefits": false,
    }
  ],
  "is_applying_for_expedited": false,
  "has_rental_income": true
}

MULTI_MEMBER_HOUSEHOLD_RECEIVING_CHILD_SUPPORT = {
  "household_members": [
    {
      "child_under_18": false,
      "disability_benefits": false,
      "is_employee": true,
      "self_employed": false,
      "receiving_child_support": true,
      "is_retired": false,
      "receiving_unemployment_benefits": false,
    },
    {
      "child_under_18": true,
      "disability_benefits": false,
      "is_employee": false,
      "self_employed": false,
      "receiving_child_support": false,
      "is_retired": false,
      "receiving_unemployment_benefits": false,
    },
    {
      "child_under_18": true,
      "disability_benefits": false,
      "is_employee": false,
      "self_employed": false,
      "receiving_child_support": false,
      "is_retired": false,
      "receiving_unemployment_benefits": false,
    },
  ],
  "is_applying_for_expedited": false
}

EXPEDITED_BENEFITS = {
  "household_members": [
    {
      "child_under_18": false,
      "disability_benefits": false,
      "is_employee": false,
      "self_employed": true,
      "receiving_child_support": false,
      "is_retired": false,
      "receiving_unemployment_benefits": false,
    }
  ],
  "is_applying_for_expedited": true
}

MULTI_MEMBER_HOUSEHOLD_WITH_RETIREE_DISABLED_AND_WORKING = {
  "household_members": [
    {
      "child_under_18": false,
      "disability_benefits": false,
      "is_employee": false,
      "self_employed": false,
      "receiving_child_support": false,
      "is_retired": true,
      "receiving_unemployment_benefits": false,
    },
    {
      "child_under_18": false,
      "disability_benefits": true,
      "is_employee": false,
      "self_employed": false,
      "receiving_child_support": false,
      "is_retired": false,
      "receiving_unemployment_benefits": false,
    },
    {
      "child_under_18": false,
      "disability_benefits": false,
      "is_employee": true,
      "self_employed": false,
      "receiving_child_support": false,
      "is_retired": false,
      "receiving_unemployment_benefits": false,
    },
  ],
  "is_applying_for_expedited": false
}


MULTI_MEMBER_HOUSEHOLD_WITH_UNEMPLOYED_AND_WORKING = {
  "household_members": [
    {
      "child_under_18": false,
      "disability_benefits": false,
      "is_employee": false,
      "self_employed": false,
      "receiving_child_support": false,
      "is_retired": false,
      "receiving_unemployment_benefits": true,
    },
    {
      "child_under_18": false,
      "disability_benefits": false,
      "is_employee": true,
      "self_employed": false,
      "receiving_child_support": false,
      "is_retired": false,
      "receiving_unemployment_benefits": false,
    },
  ],
  "is_applying_for_expedited": false
}
