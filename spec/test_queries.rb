require_relative "test_fixtures"

TEST_QUERIES = [
  {
    description: "Single employed household member",
    ruby_hash: SINGLE_HOUSEHOLD_MEMBER_EMPLOYED
  },
  {
    description: "Single self employed household member",
    ruby_hash: SINGLE_HOUSEHOLD_MEMBER_SELF_EMPLOYED
  },
  {
    description: "Single-member household with rental income",
    ruby_hash: SINGLE_HOUSEHOLD_MEMBER_WITH_RENTAL_INCOME
  },
  {
    description: "Multi-member household, head of household recieving child support",
    ruby_hash: MULTI_MEMBER_HOUSEHOLD_RECEIVING_CHILD_SUPPORT
  },
  {
    description: "Household applying for expedited benefits",
    ruby_hash: EXPEDITED_BENEFITS
  },
  {
    description: "Multi-member household -- retiree, disabled person, working person",
    ruby_hash: MULTI_MEMBER_HOUSEHOLD_WITH_RETIREE_DISABLED_AND_WORKING
  },
  {
    description: "Multi-member household -- unemployed person, working person",
    ruby_hash: MULTI_MEMBER_HOUSEHOLD_WITH_UNEMPLOYED_AND_WORKING
  }
]
