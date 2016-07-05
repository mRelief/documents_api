require_relative "../spec/test_queries"
require          "active_support/all"
require          "uri"

@base_url = ARGV[0]


def url_endpoint(base_url, query_data)
  json_data = JSON.generate(query_data)

  query_string = URI.encode(json_data)

  return "http://#{base_url}/api/#{query_string}"
end

TEST_QUERIES.each do |query|
  puts
  puts "+ [#{query[:description]}](#{url_endpoint(@base_url, query[:ruby_hash])})"
end
