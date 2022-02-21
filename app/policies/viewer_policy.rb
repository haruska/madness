# frozen_string_literal: true

class ViewerPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def show?
    user.present?
  end

  def graph_type
    Types::ViewerPolicyType
  end
end
