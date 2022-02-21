# frozen_string_literal: true

module Types
  module NodeType
    include Types::BaseInterface
    # Add the `id` field
    include GraphQL::Types::Relay::NodeBehaviors
    # Add pundit policies
    include Types::HasPolicy
  end
end
