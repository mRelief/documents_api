require_relative '../../sms/incoming_message_cleaner'

describe IncomingMessageCleaner do

  describe '#clean' do
    let(:result) { described_class.new(body).cleaned }

    context 'lowerspace' do
      let(:body) { 'yes' }
      it 'uppercases' do
        expect(result).to eq 'YES'
      end
    end

    context 'extra whitespace' do
      let(:body) { '  yes  ' }
      it 'strips the whitespace' do
        expect(result).to eq 'YES'
      end
    end

    context 'signature appended' do
      let(:body) { '  yes  -Barb' }
      it 'strips the signature' do
        expect(result).to eq 'YES'
      end
    end

  end

end
