## Fixtures for specs:

BASELINE_HOUSEHOLD_MEMBER = {
  child_under_18: "false",
  disability_benefits: "false",
  is_employee: "false",
  self_employed: "false",
  receiving_child_support: "false",
  is_retired: "false",
  receiving_unemployment_benefits: "false",
}

CHILD = BASELINE_HOUSEHOLD_MEMBER.clone
CHILD[:child_under_18] = "true"

BASELINE = {
  household_members: [BASELINE_HOUSEHOLD_MEMBER],
  is_applying_for_expedited: "false",
  has_rental_income: "false",
  renting: "false",
  owns_home: "false",
  shelter: "false",
  has_no_income: "true",
  living_with_family_or_friends: "false",
  all_citizens: "true"
}

EMPLOYED_PERSON = BASELINE_HOUSEHOLD_MEMBER.clone
EMPLOYED_PERSON[:is_employee] = "true"

SINGLE_HOUSEHOLD_MEMBER_EMPLOYED = BASELINE.clone
SINGLE_HOUSEHOLD_MEMBER_EMPLOYED[:household_members] = [EMPLOYED_PERSON]

SINGLE_HOUSEHOLD_MEMBER_SELF_EMPLOYED = BASELINE.clone
SINGLE_HOUSEHOLD_MEMBER_SELF_EMPLOYED[:household_members][0][:self_employed] = true

SINGLE_HOUSEHOLD_MEMBER_WITH_RENTAL_INCOME = BASELINE.clone
SINGLE_HOUSEHOLD_MEMBER_WITH_RENTAL_INCOME[:has_rental_income] = "true"

PERSON_RECEIVING_CHILD_SUPPORT = BASELINE_HOUSEHOLD_MEMBER
PERSON_RECEIVING_CHILD_SUPPORT[:receiving_child_support] = "true"

MULTI_MEMBER_HOUSEHOLD_RECEIVING_CHILD_SUPPORT = BASELINE.clone
MULTI_MEMBER_HOUSEHOLD_RECEIVING_CHILD_SUPPORT[:household_members] = [
  PERSON_RECEIVING_CHILD_SUPPORT, CHILD, CHILD
]

EXPEDITED_BENEFITS = BASELINE.clone
EXPEDITED_BENEFITS[:is_applying_for_expedited] = "true"

RETIREE = BASELINE_HOUSEHOLD_MEMBER.clone
RETIREE[:is_retired] = "true"

DISABLED_PERSON = BASELINE_HOUSEHOLD_MEMBER.clone
DISABLED_PERSON[:disability_benefits] = "true"

MULTI_MEMBER_HOUSEHOLD_WITH_RETIREE_DISABLED_AND_WORKING = BASELINE.clone
MULTI_MEMBER_HOUSEHOLD_WITH_RETIREE_DISABLED_AND_WORKING[:household_members] = [
  RETIREE, DISABLED_PERSON, SINGLE_HOUSEHOLD_MEMBER_EMPLOYED
]

UNEMPLOYED_PERSON = BASELINE_HOUSEHOLD_MEMBER.clone
UNEMPLOYED_PERSON[:receiving_unemployment_benefits] = "true"

MULTI_MEMBER_HOUSEHOLD_WITH_UNEMPLOYED_AND_WORKING = BASELINE.clone
MULTI_MEMBER_HOUSEHOLD_WITH_UNEMPLOYED_AND_WORKING[:household_members] = [
  UNEMPLOYED_PERSON, EMPLOYED_PERSON
]
