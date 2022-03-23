# frozen_string_literal: true

class UpdateBestFinishesJob < ApplicationJob
  queue_as :default

  def perform
    eliminations = Eliminations.new
    eliminations.best_possible_finishes.each do |bracket_id, best_finish|
      Bracket.find(bracket_id).update(best_possible_finish: best_finish)
    end
  end
end
