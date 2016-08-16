require 'rack/test'

require_relative '../support/spec_helper'
require_relative '../../app'

describe 'SMS conversation' do
  let(:valid_twilio_digits) { '+15005550006' }
  let(:incoming_phone_number_digits) { '+13125274141' } # number for theMART, a Vornado Property

  def send_sms(body)
    post '/sms', {
      From: incoming_phone_number_digits,
      To: valid_twilio_digits,
      Body: body
    }
  end

  describe '1 person, renting, citizen, self-employed, no other income, has state ID' do
    let(:expected_documents) {
      'You will need these documents: State ID, Self-Employment Form.'
    }

    it 'responds with the correct documents' do
      send_sms('Hi!')
      expect(last_response.body).to eq SMS_SCREENER['initial']
      send_sms('A')    # Just Me
      expect(last_response.body).to eq SMS_SCREENER['housing_question']
      send_sms('A')    # Renting
      expect(last_response.body).to eq SMS_SCREENER['citizenship_question']
      send_sms('YES')  # All citizens
      expect(last_response.body).to eq SMS_SCREENER['employment_question']
      send_sms('B')    # Self-employed
      expect(last_response.body).to eq SMS_SCREENER['other_income_sources_question']
      send_sms('D')    # None of the above
      expect(last_response.body).to eq SMS_SCREENER['state_id_question']
      send_sms('YES')  # Has State ID
      expect(last_response.body).to eq expected_documents
    end
  end
end
