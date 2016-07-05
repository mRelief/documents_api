require_relative "../spec/test_queries"
require_relative "../lib/endpoint_generator"
require          "active_support/all"

@base_url = ARGV[0]

raise "Base URL required" if @base_url.nil?

TEST_QUERIES.each do |query|
  url = EndpointGenerator.new(@base_url, query[:ruby_hash]).generate_url

  puts
  puts "+ [#{query[:description]}](#{url})"
end
