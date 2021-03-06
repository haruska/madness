# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_bracket, mutation: Mutations::CreateBracket
    field :update_bracket, mutation: Mutations::UpdateBracket
    field :delete_bracket, mutation: Mutations::DeleteBracket
    field :update_tournament, mutation: Mutations::UpdateTournament
  end
end
