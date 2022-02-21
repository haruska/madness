# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    implements Types::NodeType

    field :email, String, null: true
    field :name, String, null: false
    field :admin, Boolean, null: false
  end

  def email
    UserPolicy.new(context[:current_user], object).show_email? ? object.email : nil
  end
end
