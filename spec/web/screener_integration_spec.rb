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
      select_family_and_owns_home
      click_next
      expect(page).to have_content 'Select all that describe you'
      expect(page).to have_content 'Which of the following do you receive'
    end
  end

  context '... then user clicks "Employed", "Child Support", "All Citizens"' do
    it 'returns the correct confirmation page' do
      select_family_and_owns_home
      click_next
      select_employed_and_child_support_and_all_citizens
      click_next
      expect(page).to have_content 'Does this'
    end
  end

  context 'user clicks "Just Me, Renting, Next"' do
    it 'takes the user to the next page, shows copy for single-person household' do
      select_just_me_and_renting
      click_next
      expect(page).to have_content 'Select all that describe you and your family'
      expect(page).to have_content 'Which of the following does your family receive'
    end
  end

  context 'user clicks "Show More Options" on living situation question' do

    it 'shows more options' do
      visit '/screener'
      pending
      click_on(find('#showMoreOptions'))
    end

  end

end
