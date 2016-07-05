require "uri"
require "json"

class EndpointGenerator < Struct.new :base_url, :query_data

  def generate_url
    json_data = JSON.generate(query_data)

    query_string = URI.encode(json_data)

    return "http://#{base_url}/api/#{query_string}"
  end

end
