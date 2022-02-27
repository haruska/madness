# frozen_string_literal: true

module Types
  class ViewerPolicyType < Types::NodePolicyType
    {
      create_bracket: Bracket
    }.each do |field_name, object_clazz|
      field field_name, Boolean, null: false

      define_method field_name do
        policy_obj = object_clazz # .new(tournament: object.record) note: viewer doesn't have associations
        policy = Pundit.policy!(context[:current_user], policy_obj)
        policy.create?
      end
    end
  end
end
