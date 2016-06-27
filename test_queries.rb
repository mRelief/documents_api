require_relative "test_fixtures"
require          "active_support/all"

puts "localhost:4567/api/#{SINGLE_HOUSEHOLD_MEMBER_EMPLOYED.to_query}"
