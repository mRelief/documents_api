require 'rack/test'

require_relative "spec_helper"
require_relative "test_queries"
require_relative "../app"

describe "queries against API endpoints" do
  it 'does the right thing' do
    get '/'
    # Rspec 2.x
    expect(last_response).to be_ok

    # Rspec 1.x
    last_response.should be_ok
  end
end
