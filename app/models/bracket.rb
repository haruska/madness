# frozen_string_literal: true

class Bracket < ApplicationRecord
  POINTS_PER_ROUND = [0, 1, 2, 3, 5, 8, 13].freeze

  belongs_to :user

  validates :name, presence: true, uniqueness: true

  def sorted_four
    @sorted_four ||= Rails.cache.fetch("#{cache_key_with_version}/sorted_four") do
      Array(decision_team_slots[1..7]).uniq.reverse
    end
  end

  def sorted_four_teams
    sorted_four.map { |slot| Tournament.field_64.team_by_slot(slot) }
  end

  def points
    @points ||= Rails.cache.fetch(bt_cache_key('points')) do
      tournament_decision_team_slots = Tournament.field_64.decision_team_slots
      points_for(tournament_decision_team_slots)
    end
  end

  def points_for(tournament_decision_team_slots)
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

  def possible_points
    @possible_points ||= Rails.cache.fetch(bt_cache_key('possible_points')) do
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
    best_possible_finish > 5
  end

  def eliminated?
    eliminated
  end

  private

  def bt_cache_key(suffix)
    "#{Tournament.field_64.cache_key}/#{cache_key_with_version}/#{suffix}"
  end

  def decision_team_slots
    @decision_team_slots ||= Rails.cache.fetch("#{cache_key_with_version}/decision_team_slots") do
      decisions = game_decisions
      result = []

      (1..63).to_a.reverse.each do |i|
        current_position = 1 << i
        decision = decisions.nobits?(current_position) ? 0 : 1
        position = (i * 2) + decision

        result[i] = i >= 32 ? position : result[position]
      end

      result
    end
  end
end
