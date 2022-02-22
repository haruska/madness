# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    true
  end

  def destroy?
    user.admin? && user != record # can't destroy yourself
  end

  def show_email?
    user.admin? || user == record || record.admin? # can see yourself and admins
  end
end
