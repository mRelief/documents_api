require "uri"
require "json"
require "active_support/all"

class EndpointGenerator < Struct.new :base_url, :query_data

  def generate_url
    return "http://#{base_url}/api/#{query_data.to_query}"
  end

end
