# frozen_string_literal: true

module Types
  class BracketType < Types::BaseNodeObject
    field :user, Types::UserType, null: false
    field :name, String, null: false
    field :game_decisions, GraphQL::Types::BigInt, null: false
    field :tie_breaker, Int, null: false
    field :paid, Boolean, null: false
    field :final_four, [Types::TeamType], null: false
    field :tournament, Types::TournamentType, null: false

    def tournament
      Tournament.field_64
    end

    def final_four
      sorted_slots = object.sorted_four
      teams = Team.where(starting_slot: object.sorted_four).to_a

      sorted_slots.map { |slot| teams.find { |team| team.starting_slot == slot } }
    end
  end
end
