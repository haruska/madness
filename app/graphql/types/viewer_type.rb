# frozen_string_literal: true

module Types
  class ViewerType < Types::BaseObject
    implements Types::NodeType

    field :policy, Types::ViewerPolicyType, null: false
    field :current_user, Types::UserType, null: false
    field :tournament_64, Types::TournamentType, null: false
    field :brackets, [Types::BracketType], null: false do
      argument :only_user, Boolean, required: false, default_value: false
    end

    def current_user
      context[:current_user]
    end

    def tournament_64
      Tournament.field_64
    end

    def brackets(only_user: false)
      only_user ? context[:current_user].brackets : Pundit.policy_scope(context[:current_user], Bracket)
    end
  end
end
