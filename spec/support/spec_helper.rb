ENV['RACK_ENV'] = 'test'

require 'rack/test'

module RSpecMixin
  include Rack::Test::Methods

  def app() Sinatra::Application end
end

RSpec.configure do |c|
  c.include RSpecMixin
end
