# frozen_string_literal: true

class Bracket < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, uniqueness: true
  validates :tie_breaker, presence: true

  def sorted_four
    Array(decision_team_slots[1..7]).uniq.reverse
  end

  private

  def decision_team_slots
    @decision_team_slots ||= begin
      decisions = game_decisions
      result = []

      (1..63).to_a.reverse.each do |i|
        current_position = 1 << i
        decision = (decisions & current_position).zero? ? 0 : 1
        position = (i * 2) + decision

        result[i] = i >= 32 ? position : result[position]
      end

      result
    end
  end
end
