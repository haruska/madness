# frozen_string_literal: true

class TournamentPolicy < ApplicationPolicy
  def show?
    user.present?
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
