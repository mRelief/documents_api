ENV['RACK_ENV'] = 'test'

module RSpecMixin
  include Rack::Test::Methods

  def app() Sinatra::Application end

  def self.local_endpoint(query_data)
    "/api/#{query_data.to_query}"
  end
end

RSpec.configure do |c|
  c.include RSpecMixin
end
