# frozen_string_literal: true

class BracketPolicy < ApplicationPolicy
  def show?
    return false if user.blank?
    return true if Tournament.field_64.started?

    user.admin? || record.user == user
  end

  def create?
    user.present? && !Tournament.field_64.started?
  end

  def update?
    return false if user.blank?
    return true if user.admin?

    !Tournament.field_64.started? && record.user == user
  end

  def destroy?
    return false if user.blank?
    return true if user.admin?

    !Tournament.field_64.started? && record.user == user && !record.paid?
  end

  class Scope < Scope
    def resolve
      return [] if user.blank?
      return scope.all if user.admin?

      Tournament.field_64.started? ? scope.all : scope.where(user_id: user.id)
    end
  end
end
