# frozen_string_literal: true

module Types
  class BaseNodeObject < Types::BaseObject
    implements Types::NodeType
    implements Types::HasPolicy

    def self.authorized?(object, context)
      super && Pundit.authorize(context[:current_user], object, :show?)
    end
  end
end
