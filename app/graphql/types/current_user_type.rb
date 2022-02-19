# frozen_string_literal: true

module Types
  class CurrentUserType < Types::BaseObject
    field :email, String, null: false
    field :name, String, null: false
    field :admin, Boolean, null: false
  end
end
