# frozen_string_literal: true

class Bracket < ApplicationRecord
  POINTS_PER_ROUND = [0, 1, 2, 3, 5, 8, 13].freeze

  belongs_to :user

  validates :name, presence: true, uniqueness: true
  validates :tie_breaker, presence: true

  def sorted_four
    Array(decision_team_slots[1..7]).uniq.reverse
  end

  def points
    @points ||= begin
      tournament_decision_team_slots = Tournament.field_64.decision_team_slots
      (1..63).reduce(0) do |acc, i|
        t = tournament_decision_team_slots[i]
        b = decision_team_slots[i]
        if t.present? && t == b
          team_seed = Team.seed_for_slot(b)
          round_number = Round.round_num_for_slot(i)
          acc + POINTS_PER_ROUND[round_number] + team_seed
        else
          acc
        end
      end
    end
  end

  def possible_points
    @possible_points ||= begin
      tournament_decision_team_slots = Tournament.field_64.decision_team_slots
      eliminated_picks = Set.new

      (1..63).to_a.reverse.reduce(0) do |acc, i|
        t_slot = tournament_decision_team_slots[i]
        b_slot = decision_team_slots[i]

        if eliminated_picks.include?(b_slot)
          acc
        elsif t_slot.present? && b_slot != t_slot
          eliminated_picks.add(b_slot)
          acc
        else
          team_seed = Team.seed_for_slot(b_slot)
          round_number = Round.round_num_for_slot(i)
          acc + POINTS_PER_ROUND[round_number] + team_seed
        end
      end
    end
  end

  def eliminated
    false
  end

  def best_possible_finish
    1
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
