# frozen_string_literal: true

module Mutations
  class UpdateTournament < BaseMutation
    field :tournament, Types::TournamentType
    field :errors, [Types::UserErrorType], null: false

    argument :game_mask, GraphQL::Types::BigInt, required: false
    argument :game_decisions, GraphQL::Types::BigInt, required: false

    def authorized?(**_kwargs)
      tournament = Tournament.field_64
      if Pundit.policy(context[:current_user], tournament).update?
        true
      else
        [false, { errors: [{ message: 'Cannot update tournament' }] }]
      end
    end

    def resolve(**kwargs)
      tournament = Tournament.field_64
      if tournament.update(**kwargs)
        { tournament:, errors: [] }
      else
        { errors: user_errors(tournament) }
      end
    end
  end
end
