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

def select_family_and_owns_home
  visit '/screener'
  choose('justMeRadioButton')
  choose('rentingRadioButton')
end

def select_just_me_and_renting
  visit '/screener'
  choose('myFamilyRadioButton')
  choose('ownsHomeRadioButton')
end

def select_employed_and_child_support_and_all_citizens
  check('employeeCheckBox')
  check('childSupportCheckbox')
  choose('yesAllCitizensRadioBox')
end

def click_next
  click_on('nextButton')
end
