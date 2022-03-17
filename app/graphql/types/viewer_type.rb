# frozen_string_literal: true

module Types
  class ViewerType < Types::BaseNodeObject
    field :policy, Types::ViewerPolicyType, null: false
    field :current_user, Types::UserType, null: false
    field :tournament_64, Types::TournamentType, null: false
    field :teams, [Types::TeamType], null: false
    field :brackets, Types::BracketType.connection_type, null: false, max_page_size: nil

    def current_user
      context[:current_user]
    end

    def tournament_64
      Tournament.field_64
    end

    def teams
      Team.order(:starting_slot).all
    end

    def brackets
      brackets = Pundit.policy_scope(current_user, Bracket)
      tournament_64.started? ? brackets.includes(:user).to_a.sort_by { |b| [b.points * -1, b.possible_points * -1] } : brackets.where(user_id: current_user.id)
    end
  end
end
