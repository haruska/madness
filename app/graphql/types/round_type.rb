# frozen_string_literal: true

module Types
  class RoundType < Types::BaseObject
    implements Types::NodeType

    field :name, String, null: false
    field :number, Int, null: false
    field :start_date, GraphQL::Types::ISO8601Date, null: false
    field :end_date, GraphQL::Types::ISO8601Date, null: false
    field :regions, [String], null: true
  end
end
