class StringParser < Struct.new :string

  def to_boolean
    return true if string == 'true'
    return false if string == 'false'
  end

end
