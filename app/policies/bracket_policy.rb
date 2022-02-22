# frozen_string_literal: true

class BracketPolicy < ApplicationPolicy
  def show?
    Tournament.field_64.started? || user.admin? || record.user == user
  end

  def create?
    !Tournament.field_64.started?
  end

  def update?
    user.admin? || (!Tournament.field_64.started? && record.user == user)
  end

  def destroy?
    !record.paid? && (user.admin? || record.user == user)
  end

  class Scope < Scope
    def resolve
      Tournament.field_64.started? || user.admin? ? scope.all : scope.where(user_id: user.id)
    end
  end
end
