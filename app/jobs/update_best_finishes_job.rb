# frozen_string_literal: true

class UpdateBestFinishesJob < ApplicationJob
  queue_as :elimination

  def perform
    eliminations = Eliminations.new
    eliminations.results(Tournament.field_64.decision_team_slots)

    eliminations.acc.each do |bracket_id, best_finish|
      Bracket.find(bracket_id).update(best_possible_finish: best_finish)
    end
  end
end
