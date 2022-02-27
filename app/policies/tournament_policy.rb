# frozen_string_literal: true

class TournamentPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    true
  end
end
