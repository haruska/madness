# frozen_string_literal: true

module Types
  class TournamentType < Types::BaseNodeObject
    field :games_remaining, Int, null: false, method: :num_games_remaining
    field :tip_off, GraphQL::Types::ISO8601DateTime, null: false
    field :started, Boolean, null: false, method: :started?
    field :rounds, [Types::RoundType], null: false
    field :teams, [Types::TeamType], null: false
    field :game_decisions, GraphQL::Types::BigInt, null: false
    field :game_mask, GraphQL::Types::BigInt, null: false

    def teams
      Rails.cache.fetch(object.teams.cache_key) { object.teams }
    end
  end
end
