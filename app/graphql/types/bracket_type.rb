# frozen_string_literal: true

module Types
  class BracketType < Types::BaseNodeObject
    field :user, Types::UserType, null: false
    field :name, String, null: false
    field :game_decisions, GraphQL::Types::BigInt, null: false
    field :tie_breaker, Int, null: false
    field :paid, Boolean, null: false
    field :sorted_four, [Int], null: false
    field :points, Int, null: false
    field :possible_points, Int, null: false
    field :eliminated, Boolean, null: false
    field :best_possible_finish, Int, null: true
  end
end
