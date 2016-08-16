require 'rack/test'

require_relative '../support/spec_helper'
require_relative '../../app'

describe 'SMS conversation' do
  let(:valid_twilio_digits) { '+15005550006' }
  let(:incoming_phone_number_digits) { '+13125274141' } # number for theMART, a Vornado Property

  it 'responds correctly to the first message' do
    post '/sms', {
      From: incoming_phone_number_digits,
      To: valid_twilio_digits,
      Body: 'Hi!'
    }

    expect(last_response.body).to eq SMS_SCREENER['initial']
  end
end
