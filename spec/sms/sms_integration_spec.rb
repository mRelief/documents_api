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

  describe 'has State ID' do

    describe 'family, renting, citizens, self-employed, no other income, has state ID' do
      let(:expected_documents) {
        'You will need these documents: ' +
        'State IDs for everyone you are applying for, Self-Employment Form.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('B')    # My Family
        send_sms('A')    # Renting
        send_sms('YES')  # All citizens
        send_sms('B')    # Self-employed
        send_sms('D')    # None of the above
        send_sms('YES')   # No State ID
        expect(last_response.body).to eq expected_documents
      end
    end

    describe '1 person, renting, citizen, employee, no other income, has state ID' do
      let(:expected_documents) {
        'You will need these documents: State ID, Pay Stubs for the Past 30 Days.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('A')    # Just Me
        send_sms('A')    # Renting
        send_sms('YES')  # All citizens
        send_sms('A')    # Employee
        send_sms('D')    # None of the above
        send_sms('YES')  # Has State ID
        expect(last_response.body).to eq expected_documents
      end
    end

    describe '1 person, owns home, citizen, employee, child support, has state ID' do
      let(:expected_documents) {
        'You will need these documents: ' +
        'State ID, Pay Stubs for the Past 30 Days, Written Child Support Statement.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('A')    # Just Me
        send_sms('B')    # Owns home
        send_sms('YES')  # All citizens
        send_sms('A')    # Employee
        send_sms('B')    # Child support
        send_sms('YES')  # Has State ID
        expect(last_response.body).to eq expected_documents
      end
    end

    describe 'family, renting, citizen, not working, child support and disability, has state ID' do
      let(:expected_documents) {
        'You will need these documents: ' +
        'State IDs for everyone you are applying for, ' +
        'Written Child Support Statement, Award Letter for Disability.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('B')    # Family
        send_sms('A')    # Renting
        send_sms('Y')    # All citizens
        send_sms('E')    # Not working
        send_sms('BA')   # Child support and disability
        send_sms('Y')    # Has State ID
        expect(last_response.body).to eq expected_documents
      end
    end

    describe 'family, renting, citizen, employee plus self employed, has state ID' do
      let(:expected_documents) {
        'You will need these documents: ' +
        'State IDs for everyone you are applying for, ' +
        'Written Child Support Statement, Award Letter for Disability.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('B')    # Family
        send_sms('A')    # Renting
        send_sms('Y')    # All citizens
        send_sms('AB')   # Employee plus self-employed family members
        send_sms('D')    # No additional income sources
        send_sms('Y')    # Has State ID
        expect(last_response.body).to eq expected_documents
      end
    end

  end

  describe 'no state ID' do

    describe '1 person, renting, not citizen, self-employed, no other income, no state ID' do
      let(:expected_documents) {
        'Since you don\'t have a State ID, you will need to prove residency. ' +
        'You will need *ONE* of the following to prove residency: ' +
        'Rent Receipt, Mail, Medical Records. ' +
        'You will also need these documents: ' +
        'I-90 Documentation (for all non-citizen family members), Self-Employment Form.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('A')    # 1 Person
        send_sms('A')    # Renting
        send_sms('NO')   # Not citizen
        send_sms('B')    # Self-employed
        send_sms('D')    # None of the above
        send_sms('NO')   # No State ID
        expect(last_response.body).to eq expected_documents
      end
    end

    describe '1 person, renting, citizen, self-employed, no other income, no state ID' do
      let(:expected_documents) {
        'Since you don\'t have a State ID, you will need to prove residency. ' +
        'You will need *ONE* of the following to prove residency: ' +
        'Rent Receipt, Mail, Medical Records. ' +
        'You will also need a Self-Employment Form.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('A')    # Just Me
        send_sms('A')    # Renting
        send_sms('YES')  # All citizens
        send_sms('B')    # Self-employed
        send_sms('D')    # None of the above
        send_sms('NO')  # No State ID
        expect(last_response.body).to eq expected_documents
      end
    end

  end

end

