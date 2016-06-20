require_relative "household_member"

module Api
  class Documents

    def self.fetch_documents(application)
      household_members = application[:benefits_application][:household_members]

      household_members_with_documents = household_members.map do |household_member|
        HouseholdMember.new(household_member).benefits_attributes_with_documents
      end

      return {
        "benefits_application": {
          "household_members": household_members_with_documents
        }
      }
    end

  end
end

