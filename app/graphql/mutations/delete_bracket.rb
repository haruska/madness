# frozen_string_literal: true

module Mutations
  class DeleteBracket < BaseMutation
    field :errors, [Types::UserErrorType], null: false

    argument :bracket_id, ID, required: true, loads: Types::BracketType

    def resolve(bracket:)
      user = context[:current_user]
      Pundit.authorize(user, bracket, :destroy?)

      if bracket.destroy
        { errors: [] }
      else
        { errors: user_errors(bracket) }
      end
    end
  end
end
