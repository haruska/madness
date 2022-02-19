# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  def graph_type
    c_name = self.class.name
    "Types::#{c_name}Type".constantize
  end
end
