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
      choose('justMeRadioButton')
      choose('rentingRadioButton')
      click_on('nextButton')
      expect(page).to have_content 'Select all that describe you'
      expect(page).to have_content 'Which of the following do you receive'
    end

  end

  context 'user clicks "Just Me, Renting, Next"' do

    it 'takes the user to the next page, shows copy for single-person household' do
      visit '/screener'
      choose('myFamilyRadioButton')
      choose('ownsHomeRadioButton')
      click_on('nextButton')
      expect(page).to have_content 'Select all that describe you and your family'
      expect(page).to have_content 'Which of the following does your family receive'
    end

  end

  context 'user clicks "Show More Options" on living situation question' do

    it 'shows more options' do
      visit '/screener'
    end

  end

end
