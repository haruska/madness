# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def destroy?
    super && user != record # can't destroy yourself
  end

  def show?
    user.present?
  end

  def show_email?
    return false if user.blank?

    user.admin? || user == record || (user.present? && record.admin?) # can see yourself and admins
  end
end
