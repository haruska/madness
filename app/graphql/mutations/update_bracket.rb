# frozen_string_literal: true

module Mutations
  class UpdateBracket < BaseMutation
    field :bracket, Types::BracketType
    field :errors, [Types::UserErrorType], null: false

    argument :bracket_id, ID, required: true, loads: Types::BracketType
    argument :name, String, required: false
    argument :game_decisions, GraphQL::Types::BigInt, required: false
    argument :tie_breaker, Int, required: false

    def resolve(bracket:, **kwargs)
      user = context[:current_user]
      Pundit.authorize(user, bracket, :update?)

      if bracket.update(**kwargs)
        { bracket:, errors: [] }
      else
        { bracket: nil, errors: user_errors(bracket) }
      end
    end
  end
end
