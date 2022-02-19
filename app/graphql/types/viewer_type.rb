# frozen_string_literal: true

module Types
  class ViewerType < Types::BaseObject
    implements Types::NodeType

    field :current_user, Types::CurrentUserType, null: false
    field :tournament_64, Types::TournamentType, null: false

    def current_user
      context[:current_user]
    end

    def tournament_64
      Tournament.field_64
    end
  end
end
