# frozen_string_literal: true

module Types
  module HasPolicy
    include Types::BaseInterface

    field :policy, Types::NodePolicyType, null: false

    def policy
      Pundit.policy!(context[:current_user], object)
    end
  end
end
