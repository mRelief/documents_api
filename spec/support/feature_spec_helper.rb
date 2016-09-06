class CapybaraConfig
  def self.setup
    require 'capybara/rspec'
    require 'capybara-webkit'
    Capybara.app = Sinatra::Application.new
    Capybara.javascript_driver = :webkit

    Capybara::Webkit.configure do |config|
      config.allow_url("https://fonts.googleapis.com/css?family=Montserrat:400,700")
      config.allow_url("fonts.googleapis.com")
      config.allow_url("fb.me")
      config.allow_url("https://fb.me/react-15.1.0.js")
      config.allow_url("https://fb.me/react-dom-15.1.0.js")
      config.allow_url("https://code.jquery.com/jquery-3.0.0.min.js")
      config.allow_url("code.jquery.com")
      config.allow_url("https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-xap1/t39.3284-6/12726956_279572999043766_1590663715_n.js")
      config.allow_url("fbcdn-dragon-a.akamaihd.net")
      config.allow_url("https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-xpt1/t39.3284-6/13176340_977137305734260_1146243719_n.js")
      config.allow_url("fbcdn-dragon-a.akamaihd.net")
    end
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
