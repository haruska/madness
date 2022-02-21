# frozen_string_literal: true

module Mutations
  class CreateBracket < BaseMutation
    field :bracket, Types::BracketType
    field :errors, [Types::UserErrorType], null: false

    argument :name, String, required: true
    argument :game_decisions, GraphQL::Types::BigInt, required: true
    argument :tie_breaker, Int, required: true

    def resolve(**kwargs)
      user = context[:current_user]
      Pundit.authorize(user, Bracket, :create?)

      bracket = user.brackets.build(kwargs)

      if bracket.save
        { bracket:, errors: [] }
      else
        { bracket: nil, errors: user_errors(bracket) }
      end
    end
  end
end
