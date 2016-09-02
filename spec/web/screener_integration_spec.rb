require_relative '../support/spec_helper'
require_relative '../support/feature_spec_helper'
require_relative '../../app'
CapybaraConfig.setup

describe 'web screener', type: :feature, js: true do
  include Capybara::DSL

  it 'allows user to visit the screener' do
    visit '/screener'
    expect(page).to have_content 'See what documents you need for Food Stamps:'
  end

end
