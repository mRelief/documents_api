require_relative "../spec/test_queries"
require          "active_support/all"

@base_url = ARGV[0]

def url_endpoint(base_url, query_data)
  "http://#{base_url}/api/#{query_data.to_query}"
end

TEST_QUERIES.each do |query|
  puts; puts "#{query[:description]}:"
  puts url_endpoint(@base_url, query[:ruby_hash])
end
