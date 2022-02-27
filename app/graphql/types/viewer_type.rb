# frozen_string_literal: true

module Types
  class ViewerType < Types::BaseNodeObject
    field :policy, Types::ViewerPolicyType, null: false
    field :current_user, Types::UserType, null: false
    field :tournament_64, Types::TournamentType, null: false
    field :brackets, Types::BracketType.connection_type, null: false, max_page_size: nil

    def current_user
      context[:current_user]
    end

    def tournament_64
      Tournament.field_64
    end

    def brackets
      Pundit.policy_scope(context[:current_user], Bracket)
    end
  end
end
