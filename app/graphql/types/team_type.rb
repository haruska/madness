# frozen_string_literal: true

module Types
  class TeamType < Types::BaseObject
    implements Types::NodeType

    field :seed, Int, null: false
    field :name, String, null: false
    field :starting_slot, Int, null: false
  end
end
