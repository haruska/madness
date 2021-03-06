# frozen_string_literal: true

class ViewerPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    true
  end

  def create?
    false
  end

  def update?
    false
  end

  def destroy?
    false
  end

  def graph_type
    Types::ViewerPolicyType
  end
end
