require_relative "test_fixtures"
require          "active_support/all"

puts; puts "Single employed household member:"

puts "http://localhost:4567/api/#{SINGLE_HOUSEHOLD_MEMBER_EMPLOYED.to_query}"

puts; puts "Single self employed household member:"

puts "http://localhost:4567/api/#{SINGLE_HOUSEHOLD_MEMBER_SELF_EMPLOYED.to_query}"

puts; puts "Single-member household with rental income:"

puts "http://localhost:4567/api/#{SINGLE_HOUSEHOLD_MEMBER_WITH_RENTAL_INCOME.to_query}"

puts; puts "Multi-member household, head of household recieving child support:"

puts "http://localhost:4567/api/#{MULTI_MEMBER_HOUSEHOLD_RECEIVING_CHILD_SUPPORT.to_query}"

puts; puts "Household applying for expedited benefits:"

puts "http://localhost:4567/api/#{EXPEDITED_BENEFITS.to_query}"

puts; puts "Multi-member household -- retiree, disabled person, working person:"

puts "http://localhost:4567/api/#{MULTI_MEMBER_HOUSEHOLD_WITH_RETIREE_DISABLED_AND_WORKING.to_query}"

puts; puts "Multi-member household -- unemployed person, working person:"

puts "http://localhost:4567/api/#{MULTI_MEMBER_HOUSEHOLD_WITH_UNEMPLOYED_AND_WORKING.to_query}"
