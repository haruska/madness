# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def destroy?
    super && user != record # can't destroy yourself
  end

  def show?
    super || user == record || (user.present? && record.admin?) # can see yourself and admins
  end

  def show_email?
    show? # admins and current user
  end
end
