# frozen_string_literal: true

class Viewer
  include GlobalID::Identification

  ID = 'VIEWER'

  def self.find(id)
    new if id == ID
  end

  def id
    Viewer::ID
  end

  def graph_type
    'Types::ViewerType'.constantize
  end
end
