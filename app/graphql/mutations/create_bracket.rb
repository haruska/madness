# frozen_string_literal: true

module Mutations
  class CreateBracket < BaseMutation
    field :bracket, Types::BracketType
    field :errors, [Types::UserErrorType], null: false

    argument :name, String, required: true
    argument :game_decisions, GraphQL::Types::BigInt, required: true

    def ready?(**_kwargs)
      if Pundit.policy(context[:current_user], Bracket).create?
        true
      else
        [false, { errors: [{ message: 'Cannot create a bracket' }] }]
      end
    end

    def resolve(**kwargs)
      bracket = context[:current_user].brackets.build(kwargs)

      if bracket.save
        { bracket:, errors: [] }
      else
        { errors: user_errors(bracket) }
      end
    end
  end
end
