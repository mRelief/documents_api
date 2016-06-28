require 'active_support/all'
require 'json'

json_string = File.open("public/documents_data.json").read

@data = JSON.parse(json_string)

@data.each { |doc| doc.deep_symbolize_keys! }

raise "Wrong number of docs!" unless @data.size == 20

PAY_STUBS = @data[0]
SOCIAL_SECURITY_CARD = @data[1]
BANK_STATEMENTS = @data[2]
SELF_EMPLOYMENT_FORM = @data[3]
WRITTEN_CHILD_SUPPORT_STATEMENT = @data[4]
AWARD_LETTER_FOR_DISABILITY = @data[5]
AWARD_LETTER_FOR_SOCIAL_SECURITY = @data[6]
AWARD_LETTER_FOR_UNEMPLOYMENT = @data[7]
DRIVERS_LICENSE = @data[8]
RENT_RECEIPT = @data[9]
HOMELESS_SHELTER_STATEMENT = @data[10]
EMPLOYMENT_RECORDS = @data[11]
MAIL = @data[12]
MEDICAL_RECORDS = @data[13]
HOME_OWNERS_INSURANCE = @data[14]
PROPERTY_TAX_BILL = @data[15]
SCHOOL_ENROLLMENT_RECORDS = @data[16]
OTHER_ID = @data[17]
SOCIAL_SECURITY_NUMBER = @data[18]
DATE_OF_BIRTH = @data[19]
