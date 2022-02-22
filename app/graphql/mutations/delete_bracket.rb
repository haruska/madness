# frozen_string_literal: true

module Mutations
  class DeleteBracket < BaseMutation
    field :errors, [Types::UserErrorType], null: false

    argument :bracket_id, ID, required: true, loads: Types::BracketType

    def authorized?(bracket:)
      if Pundit.policy(context[:current_user], bracket).destroy?
        true
      else
        [false, { errors: [{ message: 'Cannot delete bracket' }] }]
      end
    end

    def resolve(bracket:)
      if bracket.destroy
        { errors: [] }
      else
        { errors: user_errors(bracket) }
      end
    end
  end
end
