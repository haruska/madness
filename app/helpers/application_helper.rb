# frozen_string_literal: true

module ApplicationHelper
  def tournament
    @tournament ||= Tournament.field_64
  end
end
