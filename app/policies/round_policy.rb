# frozen_string_literal: true

class RoundPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def show?
    user.present?
  end
end
