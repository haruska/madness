# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def show?
    super || user == record
  end

  def show_email?
    show? # admins and current user
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
