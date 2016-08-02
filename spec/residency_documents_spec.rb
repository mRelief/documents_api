require_relative "../load_documents_data"
require_relative "../models/residency_documents"

describe ResidencyDocuments do

  describe '#documents' do

    context 'homeowner' do
      let(:residency_documents_request) {
        described_class.new(
          renting: false,
          owns_home: true,
          shelter: false,
          living_with_family_or_friends: false,
        )
      }

      it 'includes homeowner insurance and property tax bill' do
        expect(residency_documents_request.documents.map { |doc| doc[:official_name] }).to eq [
          "State ID",
          "Home Owners Insurance",
          "Property Tax Bill",
          "Mail",
          "Medical Records"
        ]
      end
    end

    context 'living with family or friends' do
      let(:residency_documents_request) {
        described_class.new(
          renting: false,
          owns_home: false,
          shelter: false,
          living_with_family_or_friends: true,
        )
      }

      it 'includes letter from family or friends' do
        expect(residency_documents_request.documents.map { |doc| doc[:official_name] }).to eq [
          "State ID",
          "Letter from Family or Friend",
          "Mail",
          "Medical Records"
        ]
      end
    end

  end

end
