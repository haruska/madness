# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :viewer, Types::ViewerType, null: false

    field :node, GraphQL::Types::Relay::Node, null: true do
      argument :id, ID, required: true
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    def viewer
      Viewer.new
    end
  end
end
