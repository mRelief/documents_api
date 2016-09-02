require_relative '../support/spec_helper'
require_relative '../../app'
require 'capybara/rspec'
require 'capybara-webkit'
Capybara.app = Sinatra::Application.new
Capybara.javascript_driver = :webkit
Capybara.app_host = "http://localhost:4567"
Capybara.server_host = "localhost"
Capybara.server_port = "4567"

describe 'web screener', type: :feature, js: true do
  include Capybara::DSL

  it 'allows user to visit the screener' do
    visit '/screener'
    expect(page).to have_content 'See what documents you need for Food Stamps:'
  end

end
