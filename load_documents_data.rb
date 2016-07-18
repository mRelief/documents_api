require 'active_support/all'
require 'json'

json_string = File.open("public/documents_data.json").read

@data = JSON.parse(json_string)

@data.each { |doc| doc.deep_symbolize_keys! }

raise "Wrong number of docs!" unless @data.size == 26

PAY_STUBS = @data[0]
raise "Wrong variable!" unless PAY_STUBS[:official_name] == "Pay Stubs"

SOCIAL_SECURITY_CARD = @data[1]
raise "Wrong variable!" unless SOCIAL_SECURITY_CARD[:official_name] == "Social Security Card"

BANK_STATEMENTS = @data[2]
raise "Wrong variable!" unless BANK_STATEMENTS[:official_name] == "Bank Statements"

SELF_EMPLOYMENT_FORM = @data[3]
raise "Wrong variable!" unless SELF_EMPLOYMENT_FORM[:official_name] == "Self-Employment Form"

WRITTEN_CHILD_SUPPORT_STATEMENT = @data[4]
raise "Wrong variable!" unless WRITTEN_CHILD_SUPPORT_STATEMENT[:official_name] == "Written Child Support Statement"

AWARD_LETTER_FOR_DISABILITY = @data[5]
raise "Wrong variable!" unless AWARD_LETTER_FOR_DISABILITY[:official_name] == "Award Letter for Disability"

AWARD_LETTER_FOR_SOCIAL_SECURITY = @data[6]
raise "Wrong variable!" unless AWARD_LETTER_FOR_SOCIAL_SECURITY[:official_name] == "Award Letter from Social Security"

AWARD_LETTER_FOR_UNEMPLOYMENT = @data[7]
raise "Wrong variable!" unless AWARD_LETTER_FOR_UNEMPLOYMENT[:official_name] == "Award Letter for Unemployment"

DRIVERS_LICENSE = @data[8]
raise "Wrong variable!" unless DRIVERS_LICENSE[:official_name] == "Valid Illinois Driver's License"

RENT_RECEIPT = @data[9]
raise "Wrong variable!" unless RENT_RECEIPT[:official_name] == "Rent Receipt"

HOMELESS_SHELTER_STATEMENT = @data[10]
raise "Wrong variable!" unless HOMELESS_SHELTER_STATEMENT[:official_name] == "Homeless Shelter Statement"

EMPLOYMENT_RECORDS = @data[11]
raise "Wrong variable!" unless EMPLOYMENT_RECORDS[:official_name] == "Employment Records"

MAIL = @data[12]
raise "Wrong variable!" unless MAIL[:official_name] == "Mail"

MEDICAL_RECORDS = @data[13]
raise "Wrong variable!" unless MEDICAL_RECORDS[:official_name] == "Medical Records"

HOME_OWNERS_INSURANCE = @data[14]
raise "Wrong variable!" unless HOME_OWNERS_INSURANCE[:official_name] == "Home Owners Insurance"

PROPERTY_TAX_BILL = @data[15]
raise "Wrong variable!" unless PROPERTY_TAX_BILL[:official_name] == "Property Tax Bill"

SCHOOL_ENROLLMENT_RECORDS = @data[16]
raise "Wrong variable!" unless SCHOOL_ENROLLMENT_RECORDS[:official_name] == "School Enrollment Records"

FEDERAL_STATE_LOCAL_ID = @data[17]
raise "Wrong variable!" unless FEDERAL_STATE_LOCAL_ID[:official_name] == "Federal, State, or Local ­Government issued ID"

SCHOOL_PHOTO_ID = @data[18]
raise "Wrong variable!" unless SCHOOL_PHOTO_ID[:official_name] == "School Photo ID"

US_MILITARY_CARD = @data[19]
raise "Wrong variable!" unless US_MILITARY_CARD[:official_name] == "U.S. Military ID Card"

VOTER_REGISTRATION_CARD = @data[20]
raise "Wrong variable!" unless VOTER_REGISTRATION_CARD[:official_name] == "Voter Registration Card"

BIRTH_CERTIFICATE = @data[21]
raise "Wrong variable!" unless BIRTH_CERTIFICATE[:official_name] == "Birth Certificate"

LETTER_FROM_FAMILY_OR_FRIEND = @data[22]
raise "Wrong variable!" unless LETTER_FROM_FAMILY_OR_FRIEND[:official_name] == "Letter from Family or Friend"

SOCIAL_SECURITY_NUMBER = @data[23]
raise "Wrong variable!" unless SOCIAL_SECURITY_NUMBER[:official_name] == "Social Security Number"

DATE_OF_BIRTH = @data[24]
raise "Wrong variable!" unless DATE_OF_BIRTH[:official_name] == "Date Of Birth"

I_90_DOCUMENTATION = @data[25]
raise "Wrong variable!" unless I_90_DOCUMENTATION[:official_name] == "I-90 Documentation"

