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

  context 'user clicks "My Family, Own Home, Next"' do

    it 'takes the user to the next page, shows copy for multi-person household' do
      visit '/screener'
      save_and_open_page
    end

  end

  context 'user clicks "Just Me, Renting, Next"' do

    it 'takes the user to the next page, shows copy for single-person household' do
      visit '/screener'
      save_and_open_page
    end

  end

  context 'user clicks "Show More Options" on living situation question' do

    it 'shows more options' do
      visit '/screener'

    end

  end

end
