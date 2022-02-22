# frozen_string_literal: true

module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    # make the generated payload class non-null
    null false

    def user_errors(object)
      object.errors.messages.map do |attribute, messages|
        path = ['attributes', attribute.to_s.camelize(:lower)]
        message = messages.join('/')
        { path:, message: }
      end
    end
  end
end
