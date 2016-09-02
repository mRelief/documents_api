class CapybaraConfig
  def self.setup
    require 'capybara/rspec'
    require 'capybara-webkit'
    Capybara.app = Sinatra::Application.new
    Capybara.javascript_driver = :webkit
    Capybara.app_host = "http://localhost:4567"
    Capybara.server_host = "localhost"
    Capybara.server_port = "4567"
  end
end
