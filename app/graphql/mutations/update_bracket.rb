# frozen_string_literal: true

module Mutations
  class UpdateBracket < BaseMutation
    field :bracket, Types::BracketType
    field :errors, [Types::UserErrorType], null: false

    argument :bracket_id, ID, required: true, loads: Types::BracketType
    argument :name, String, required: false
    argument :game_decisions, GraphQL::Types::BigInt, required: false

    def authorized?(bracket:, **_kwargs)
      if Pundit.policy(context[:current_user], bracket).update?
        true
      else
        [false, { errors: [{ message: 'Cannot update bracket' }] }]
      end
    end

    def resolve(bracket:, **kwargs)
      if bracket.update(**kwargs)
        { bracket:, errors: [] }
      else
        { errors: user_errors(bracket) }
      end
    end
  end
end
