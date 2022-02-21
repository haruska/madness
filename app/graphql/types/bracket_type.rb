# frozen_string_literal: true

module Types
  class BracketType < Types::BaseObject
    implements Types::NodeType

    field :user, Types::UserType, null: false
    field :name, String, null: false
    field :game_decisions, GraphQL::Types::BigInt, null: false
    field :tie_breaker, Int, null: false
    field :paid, Boolean, null: false
  end
end
