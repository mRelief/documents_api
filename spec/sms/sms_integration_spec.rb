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

        expect(last_response.body).to eq (
          'How many people are you applying for? A. Just Me. B. Me and My Family. ' +
          'Please enter A or B. (2/2)')
        send_sms('B')    # My Family

        expect(last_response.body).to eq ('Describe your living situation: ' +
          'A. Renting. B. Own home. C. Living with family/friends. D. Shelter. ' +
          'Please enter A, B, C, or D. ' +
          'For more options, type \'options.\'')
        send_sms('A')    # Renting

        expect(last_response.body).to eq 'Is everyone in your household a US citizen? Y or N.'
        send_sms('YES')  # All citizens

        expect(last_response.body).to eq ('Select all that describe you: ' +
          'A. Employed. B. Unemployed. ' +
          'C. Retired. D. Self-employed. E. None of the above. ' +
          'Please enter A, B, C, D, E, or a combination. For example: AD.')
        send_sms('A')    # Employed

        expect(last_response.body).to eq ('Which of the following do you receive: ' +
          'A. Disability benefits. B. Child support. ' +
          'C. Rental income. D. None of the above. ' +
          'Please enter A, B, C, D, or a combination. For example: BC.')
        send_sms('B')    # Child support

        expect(last_response.body).to eq 'Do you have a State ID? Y or N.'
        send_sms('YES')

        expect(last_response.body).to eq('Do you have a Birth Certificate? Y or N.')
        send_sms('YES')

        expect(last_response.body).to eq('Do you have a Social Security Card? Y or N.')
        send_sms('YES')

        expect(last_response.body).to eq('You will need these documents ' +
          'to complete your Food Stamps application: ' +
          'State IDs for everyone you are applying for, ' +
          'Pay Stubs for the Past 30 Days, Written Child Support Statement. ' +
          'Since you have a Birth Certificate and a Social Security Card, ' +
          'bring them just in case they are needed.')
      end

    end

  end

  describe 'has State ID' do

    describe 'family, renting, citizens, self-employed, no other income, has state ID' do
      let(:expected_documents) {
        'You will need these documents to complete your Food Stamps application: ' +
        'State IDs for everyone you are applying for, Self-Employment Form. ' +
        'Since you have a Birth Certificate and a Social Security Card, ' +
        'bring them just in case they are needed.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('B')    # My Family
        send_sms('A')    # Renting
        send_sms('YES')  # All citizens
        send_sms('D')    # Self-employed
        send_sms('D')    # None of the above
        send_sms('YES')  # State ID
        send_sms('YES')  # Birth Certificate
        send_sms('YES')  # Social Security Card

        expect(last_response.body).to eq expected_documents
      end
    end

    describe '1 person, renting, citizen, employee, no other income, has state ID' do
      let(:expected_documents) {
        'You will need these documents to complete your Food Stamps application: ' +
        'State ID, Pay Stubs for the Past 30 Days. ' +
        'Since you have a Birth Certificate and a Social Security Card, ' +
        'bring them just in case they are needed.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('A')    # Just Me
        send_sms('A')    # Renting
        send_sms('YES')  # All citizens
        send_sms('A')    # Employee
        send_sms('D')    # None of the above
        send_sms('YES')  # Has State ID
        send_sms('YES')  # Birth Certificate
        send_sms('YES')  # Social Security Card

        expect(last_response.body).to eq expected_documents
      end
    end

    describe '1 person, renting, citizen, employee, no other income, has state ID but no\
              birth certificate or social security card' do

      let(:expected_documents) {
        'You will need these documents to complete your Food Stamps application: ' +
        'State ID, Pay Stubs for the Past 30 Days.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('A')    # Just Me
        send_sms('A')    # Renting
        send_sms('YES')  # All citizens
        send_sms('A')    # Employee
        send_sms('D')    # None of the above
        send_sms('YES')  # Has State ID
        send_sms('N')    # Birth Certificate
        send_sms('N')    # Social Security Card

        expect(last_response.body).to eq expected_documents
      end
    end

    describe '1 person, owns home, citizen, employee, child support, has state ID' do
      let(:expected_documents) {
        'You will need these documents to complete your Food Stamps application: ' +
        'State ID, Pay Stubs for the Past 30 Days, Written Child Support Statement. ' +
        'Since you have a Birth Certificate and a Social Security Card, ' +
        'bring them just in case they are needed.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('A')    # Just Me
        send_sms('B')    # Owns home
        send_sms('YES')  # All citizens
        send_sms('A')    # Employee
        send_sms('B')    # Child support
        send_sms('YES')  # Has State ID
        send_sms('YES')  # Birth Certificate
        send_sms('YES')  # Social Security Card

        expect(last_response.body).to eq expected_documents
      end
    end


    describe 'family, renting, citizen, not working, child support and disability, has state ID' do
      let(:expected_documents) {
        'You will need these documents to complete your Food Stamps application: ' +
        'State IDs for everyone you are applying for, ' +
        'Written Child Support Statement, Award Letter for Disability. ' +
        'Since you have a Birth Certificate and a Social Security Card, ' +
        'bring them just in case they are needed.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('B')    # Family
        send_sms('A')    # Renting
        send_sms('Y')    # All citizens
        send_sms('E')    # Not working
        send_sms('BA')   # Child support and disability
        send_sms('Y')    # Has State ID
        send_sms('YES')  # Birth Certificate
        send_sms('YES')  # Social Security Card

        expect(last_response.body).to eq expected_documents
      end
    end

    describe 'family, renting, citizen, employee plus self employed, has state ID' do
      let(:expected_documents) {
        'You will need these documents to complete your Food Stamps application: ' +
        'State IDs for everyone you are applying for, ' +
        'Pay Stubs for the Past 30 Days, Self-Employment Form. ' +
        'Since you have a Birth Certificate and a Social Security Card, ' +
        'bring them just in case they are needed.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('B')    # Family
        send_sms('A')    # Renting
        send_sms('Y')    # All citizens
        send_sms('AD')   # Employee plus self-employed family members
        send_sms('D')    # No additional income sources
        send_sms('Y')    # Has State ID
        send_sms('YES')  # Birth Certificate
        send_sms('YES')  # Social Security Card

        expect(last_response.body).to eq expected_documents
      end
    end

    describe 'tiered unemployment questions' do

      describe 'unemployed, receiving benefits, no paycheck within last 30 days' do
        let(:expected_documents) {
          'You will need these documents to complete your Food Stamps application: ' +
          'State IDs for everyone you are applying for, Award Letter for Unemployment. ' +
          'Since you have a Birth Certificate and a Social Security Card, ' +
          'bring them just in case they are needed.'
        }

        it 'responds with the correct documents' do
          send_sms('Hi!')
          send_sms('B')    # Family
          send_sms('A')    # Renting
          send_sms('Y')    # All citizens
          send_sms('B')    # Unemployed
          send_sms('Y')    # Receiving benefits
          send_sms('N')    # No paycheck within 30 days
          send_sms('D')    # No additional income sources
          send_sms('Y')    # Has State ID
          send_sms('YES')  # Birth Certificate
          send_sms('YES')  # Social Security Card

          expect(last_response.body).to eq expected_documents
        end
      end

      describe 'unemployed, not receiving benefits, paycheck within last 30 days' do
        let(:expected_documents) {
          'You will need these documents to complete your Food Stamps application: ' +
          'State IDs for everyone you are applying for, Pay Stubs for the Past 30 Days. ' +
          'Since you have a Birth Certificate and a Social Security Card, ' +
          'bring them just in case they are needed.'
        }

        it 'responds with the correct documents' do
          send_sms('Hi!')
          send_sms('B')    # Family
          send_sms('A')    # Renting
          send_sms('Y')    # All citizens
          send_sms('B')    # Unemployed
          send_sms('N')    # Not receiving benefits
          send_sms('Y')    # Paycheck within 30 days
          send_sms('D')    # No additional income sources
          send_sms('Y')    # Has State ID
          send_sms('YES')  # Birth Certificate
          send_sms('YES')  # Social Security Card

          expect(last_response.body).to eq expected_documents
        end
      end

      describe 'unemployed, receiving benefits, paycheck within last 30 days' do
        let(:expected_documents) {
          'You will need these documents to complete your Food Stamps application: ' +
          'State IDs for everyone you are applying for, ' +
          'Pay Stubs for the Past 30 Days, Award Letter for Unemployment. ' +
          'Since you have a Birth Certificate and a Social Security Card, ' +
          'bring them just in case they are needed.'
        }

        it 'responds with the correct documents' do
          send_sms('Hi!')
          send_sms('B')    # Family
          send_sms('A')    # Renting
          send_sms('Y')    # All citizens
          send_sms('B')    # Unemployed
          send_sms('Y')    # Receiving benefits
          send_sms('Y')    # Paycheck within 30 days
          send_sms('D')    # No additional income sources
          send_sms('Y')    # Has State ID
          send_sms('YES')  # Birth Certificate
          send_sms('YES')  # Social Security Card

          expect(last_response.body).to eq expected_documents
        end
      end

    end

  end

  describe 'no state ID' do

    describe '1 person, renting, not citizen, self-employed, no other income, no state ID' do
      let(:expected_documents) {
        'You will need these documents to complete your Food Stamps application: ' +
        'Birth Certificate, Social Security Card, ' +
        'I-90 Documentation (for all non-citizen family members), ' +
        'Self-Employment Form. You will need *ONE* of these documents to prove residency: ' +
        'Rent Receipt, Mail, Medical Records.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('A')    # 1 Person
        send_sms('A')    # Renting
        send_sms('NO')   # Not citizen
        send_sms('D')    # Self-employed
        send_sms('D')    # None of the above
        send_sms('NO')   # No State ID
        send_sms('YES')  # Birth Certificate
        send_sms('YES')  # Social Security Card

        expect(last_response.body).to eq expected_documents
      end
    end

    describe '1 person, renting, citizen, self-employed, no other income, no state ID' do
      let(:expected_documents) {
        'You will need these documents to complete your Food Stamps application: ' +
        'Birth Certificate, Social Security Card, ' +
        'Self-Employment Form. ' +
        'You will need *ONE* of these documents to prove residency: ' +
        'Rent Receipt, Mail, Medical Records.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('A')    # Just Me
        send_sms('A')    # Renting
        send_sms('YES')  # All citizens
        send_sms('D')    # Self-employed
        send_sms('D')    # None of the above
        send_sms('NO')   # No State ID
        send_sms('YES')  # Birth Certificate
        send_sms('YES')  # Social Security Card

        expect(last_response.body).to eq expected_documents
      end
    end

    describe 'family, renting, citizen, employee plus self employed, no state ID' do
      let(:expected_documents) {
        'You will need these documents to complete your Food Stamps application: ' +
        'Birth Certificate, Social Security Card, Pay Stubs for the Past 30 Days, ' +
        'Self-Employment Form. ' +
        'You will need *ONE* of these documents to prove residency: ' +
        'Rent Receipt, Mail, Medical Records.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('B')    # Family
        send_sms('A')    # Renting
        send_sms('Y')    # All citizens
        send_sms('AD')   # Employee plus self-employed family members
        send_sms('D')    # No additional income sources
        send_sms('N')    # No State ID
        send_sms('YES')  # Birth Certificate
        send_sms('YES')  # Social Security Card

        expect(last_response.body).to eq expected_documents
      end
    end

    describe 'family, renting, citizen, employee, no state ID or birth certificate or social' do
      let(:expected_documents) {
        'You will need these documents to complete your Food Stamps application: ' +
        'Birth Certificate, Social Security Card, Pay Stubs for the Past 30 Days, ' +
        'Self-Employment Form. ' +
        'You will need *ONE* of these documents to prove residency: ' +
        'Rent Receipt, Mail, Medical Records.'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('B')    # Family
        send_sms('A')    # Renting
        send_sms('Y')    # All citizens
        send_sms('AD')   # Employee plus self-employed family members
        send_sms('D')    # No additional income sources
        send_sms('N')    # No State ID
        send_sms('NO')  # Birth Certificate
        send_sms('NO')  # Social Security Card

        expect(last_response.body).to eq expected_documents
      end
    end

    describe 'user retakes the screener' do
      let(:expected_outcome) {
        'How many people are you applying for? A. Just Me. B. Me and My Family. ' +
        'Please enter A or B. (2/2)'
      }

      it 'responds with the correct documents' do
        send_sms('Hi!')
        send_sms('B')    # Family
        send_sms('A')    # Renting
        send_sms('Y')    # All citizens
        send_sms('AD')   # Employee plus self-employed family members
        send_sms('D')    # No additional income sources
        send_sms('N')    # No State ID
        send_sms('RESET')  # Start screener again

        expect(last_response.body).to eq expected_outcome
      end
    end

   describe '1 person, staying in car, citizen, employee, child support, no state ID' do
      let(:expected_documents) {
        'You will need these documents to complete your Food Stamps application: ' +
        'Birth Certificate, Social Security Card, Pay Stubs for the Past 30 Days, ' +
        'Written Child Support Statement. ' +
        'You will need *ONE* of these documents to prove residency: Mail, Medical Records.'
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
        send_sms('YES')  # Birth Certificate
        send_sms('YES')  # Social Security Card

        expect(last_response.body).to eq expected_documents
      end
    end

    describe '1 person, staying in motel, not citizen, no income, no state ID' do
      let(:expected_documents) {
        'You will need these documents to complete your Food Stamps application: ' +
        'Birth Certificate, Social Security Card, ' +
        'I-90 Documentation (for all non-citizen family members). ' +
        'You will need *ONE* of these documents to prove residency: Mail, Medical Records.'
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
        send_sms('YES')  # Birth Certificate
        send_sms('YES')  # Social Security Card

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
      'How many people are you applying for? A. Just Me. B. Me and My Family. ' +
      'Please enter A or B. (2/2)'
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
      'You will need these documents to complete your Food Stamps application: ' +
      'State ID, Self-Employment Form. ' +
      'Since you have a Birth Certificate and a Social Security Card, ' +
      'bring them just in case they are needed.'
    }

    it 'gets the same outcome' do
      send_sms('Hi! -Alex')
      send_sms('A -Alex')    # Just Me
      send_sms('A -Alex')    # Renting
      send_sms('YES -Alex')  # All citizens
      send_sms('D -Alex')    # Self-employed
      send_sms('D -Alex')    # None of the above
      send_sms('YES -Alex')  # Has State ID
      send_sms('YES -Alex')  # Birth Certificate
      send_sms('YES -Alex')  # Social Security Card

      expect(last_response.body).to eq expected_documents
    end

  end

end
