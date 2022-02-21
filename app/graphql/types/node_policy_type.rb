# frozen_string_literal: true

module Types
  class NodePolicyType < Types::BaseObject
    field :show, Boolean, null: false, method: :show?
    field :update, Boolean, null: false, method: :update?
    field :destroy, Boolean, null: false, method: :destroy?
  end
end
