# frozen_string_literal: true

class TournamentPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def show?
    user.present?
  end
end
