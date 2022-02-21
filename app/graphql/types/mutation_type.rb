# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_bracket, mutation: Mutations::CreateBracket
  end
end
