# frozen_string_literal: true

module Types
  class ViewerType < Types::BaseObject
    implements Types::NodeType

    field :current_user, Types::CurrentUserType, null: true

    def current_user
      context[:current_user]
    end
  end
end
