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

  describe 'sends all the right questions in the right order' do

    describe 'family, renting, citizens, employee, child support, has state ID' do

      it 'responds with the correct documents' do
        send_sms('Hi!')

        expect(last_response.body).to eq ('Welcome. ' +
          'Here you can find out what documents you need to apply for Food Stamps. ' +
          'How many people are you applying for? A. Just Me. B. Me and My Family.')
        send_sms('B')    # My Family

        expect(last_response.body).to eq ('Describe your living situation: ' +
          'A. Renting. B. Own home. C. Living with family/friends. ' +
          'D. Shelter. For more options, type \'options.\'')
        send_sms('A')    # Renting

        expect(last_response.body).to eq 'Is everyone in your household a US citizen? Y or N.'
        send_sms('YES')  # All citizens

        expect(last_response.body).to eq ('Select all that describe you: ' +
          'A. Employed. B. Self-employed. C. Retired. ' +
          'D. Receiving unemployment benefits. E. None of the above.')
        send_sms('A')    # Employed

        expect(last_response.body).to eq ('Which of the following do you receive: ' +
          'A. Disability benefits. B. Child support. C. Rental income. ' +
          'D. None of the above.')
        send_sms('B')    # Child support

        expect(last_response.body).to eq 'Do you have a State ID? Y or N.'
        send_sms('YES')  # State ID

        expect(last_response.body).to eq('You will need these documents: ' +
          'State IDs for everyone you are applying for, ' +
          'Pay Stubs for the Past 30 Days, Written Child Support Statement.')
      end

    end

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
        send_sms('YES')  # No State ID
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
        'Pay Stubs for the Past 30 Days, Self-Employment Form.'
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

    describe 'family, renting, citizen, employee plus self employed, no state ID' do
      let(:expected_documents) {
        'Since you don\'t have a State ID, you will need to prove residency. ' +
        'You will need *ONE* of the following to prove residency: ' +
        'Rent Receipt, Mail, Medical Records. ' +
        'You will also need these documents: ' +
        'Pay Stubs for the Past 30 Days, Self-Employment Form.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('B')    # Family
        send_sms('A')    # Renting
        send_sms('Y')    # All citizens
        send_sms('AB')   # Employee plus self-employed family members
        send_sms('D')    # No additional income sources
        send_sms('N')    # No State ID
        expect(last_response.body).to eq expected_documents
      end
    end

    describe 'user retakes the screener' do
      let(:expected_outcome) {
        'Welcome. ' +
        'Here you can find out what documents you need to apply for Food Stamps. ' +
        'How many people are you applying for? A. Just Me. B. Me and My Family.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('B')    # Family
        send_sms('A')    # Renting
        send_sms('Y')    # All citizens
        send_sms('AB')   # Employee plus self-employed family members
        send_sms('D')    # No additional income sources
        send_sms('N')    # No State ID
        send_sms('OK!')  # Start screener again
        expect(last_response.body).to eq expected_outcome
      end
    end

   describe '1 person, staying in car, citizen, employee, child support, no state ID' do
      let(:expected_documents) {
        'Since you don\'t have a State ID, you will need to prove residency. ' +
        'You will need *ONE* of the following to prove residency: ' +
        'Mail, Medical Records. ' +
        'You will also need these documents: ' +
        'Pay Stubs for the Past 30 Days, Written Child Support Statement.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('A')          # Just Me
        send_sms('OPTIONS')    # Asking for more options
        expect(last_response.body).to eq "Here are some more options: E. Car. F. Motel G. In Kind."

        send_sms('E')          # Staying in car
        send_sms('Y')          # All citizens
        send_sms('A')          # Employee
        send_sms('B')          # Child support
        send_sms('N')          # No State ID
        expect(last_response.body).to eq expected_documents
      end
    end

   describe '1 person, staying in motel, not citizen, no income, no state ID' do
      let(:expected_documents) {
        'Since you don\'t have a State ID, you will need to prove residency and identity. ' +
        'You will need *ONE* of the following to prove residency: Mail, Medical Records. ' +
        'You will need *ONE* of the following to prove identity: ' +
        'School Photo ID, U.S. Military ID Card, Voter Registration Card, Birth Certificate. ' +
        'You will also need a I-90 Documentation (for all non-citizen family members).'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('A')          # Just Me
        send_sms('OPTIONS')    # Asking for more options
        expect(last_response.body).to eq "Here are some more options: E. Car. F. Motel G. In Kind."

        send_sms('F')          # Staying in motel
        send_sms('N')          # Not citizen
        send_sms('E')          # No employment-related income
        send_sms('D')          # No additional income
        send_sms('N')          # No State ID
        expect(last_response.body).to eq expected_documents
      end
    end

  end

  describe 'user sends invalid response' do

    describe 'sends nonsense' do
      it 'responds with a "sorry" message' do
        send_sms('Hi!')
        send_sms('Hiiiiiiii!')    # Invalid response to question #1

        expect(last_response.body).to eq 'Please select one of these options: A, B, ME, JUST ME, MY FAMILY, ME AND MY FAMILY.'
      end
    end

    describe 'sends Y/N answer to an A/B question' do
      it 'responds with a "sorry" message' do
        send_sms('Hi!')
        send_sms('Y')             # Invalid response to question #1, valid for other questions tho

        expect(last_response.body).to eq 'Please select one of these options: A, B, ME, JUST ME, MY FAMILY, ME AND MY FAMILY.'
      end
    end

    describe 'sends A/B answer to Y/N question' do
      it 'responds with a "sorry" message' do
        send_sms('Hi!')
        send_sms('B')    # Family
        send_sms('A')    # Renting
        send_sms('A')    # Invalid response to citizenship question

        expect(last_response.body).to eq 'Please select one of these options: Y, YES, N, NO.'
      end
    end

  end

  describe 'user resets the survey' do
    let(:expected_outcome) {
      'Welcome. ' +
      'Here you can find out what documents you need to apply for Food Stamps. ' +
      'How many people are you applying for? A. Just Me. B. Me and My Family.'
    }

    it 'responds with the correct documents' do
      send_sms('Hi!')
      send_sms('A')
      send_sms('RESET')

      expect(last_response.body).to eq expected_outcome
    end
  end

  describe 'user sends all texts with a signature' do
    let(:expected_documents) {
      'You will need these documents: State ID, Self-Employment Form.'
    }

    it 'gets the same outcome' do
      send_sms('Hi! -Alex')
      send_sms('A -Alex')    # Just Me
      send_sms('A -Alex')    # Renting
      send_sms('YES -Alex')  # All citizens
      send_sms('B -Alex')    # Self-employed
      send_sms('D -Alex')    # None of the above
      send_sms('YES -Alex')  # Has State ID
      expect(last_response.body).to eq expected_documents
    end

  end

end
