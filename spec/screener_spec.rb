require_relative 'support/spec_helper'
require 'capybara'
require 'capybara/dsl'

describe 'screener', type: :feature, js: true do
  include Capybara::DSL
  Capybara.app = Sinatra::Application.new
  Capybara.javascript_driver = :webkit
  Capybara.default_max_wait_time = 30

  it 'visits main screener page' do
    visit '/screener'
    expect(find('#screener-title').text).to eq 'See what documents you need for Food Stamps'
  end

end
