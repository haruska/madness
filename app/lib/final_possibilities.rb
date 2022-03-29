# frozen_string_literal: true

class FinalPossibilities
  class Result
    include ActiveAttr::Model

    attribute :winning_team
    attribute :losing_team
    attribute :bracket_positions
  end

  def self.output
    out = []
    results.each do |result|
      out << "#{result.winning_team.name} BEATS #{result.losing_team.name}"
      out << ('-' * 45)
      result.bracket_positions.each_with_index do |brackets, i|
        next if Array(brackets).empty?

        out << "#{'T' if brackets.size > 1}#{i + 1}. #{brackets.map(&:name).join(' / ')}"
      end

      out << ''
    end

    out.join("\n")
  end

  def self.results(t_decision_team_slots = nil)
    t_decision_team_slots ||= Tournament.field_64.decision_team_slots

    nil_slot = t_decision_team_slots.rindex(nil)

    if nil_slot && !nil_slot.zero?
      t_decision_team_slots[nil_slot] = t_decision_team_slots[nil_slot * 2] # decision == 0
      left_results = results(t_decision_team_slots)

      t_decision_team_slots[nil_slot] = t_decision_team_slots[(nil_slot * 2) + 1] # decision == 1
      right_results = results(t_decision_team_slots)

      t_decision_team_slots[nil_slot] = nil
      left_results + right_results
    else
      tuples = brackets.map do |bracket|
        [bracket, bracket.points_for(t_decision_team_slots)]
      end

      tuples.sort_by! { |tuple| -tuple[1] }

      bracket_positions = []
      rank = 0
      tuples.each.with_index do |tuple, i|
        rank = i unless i.zero? || tuple[1] == tuples[i - 1][1]
        break unless rank < 5

        bracket_positions[rank] ||= []
        bracket_positions[rank] << tuple[0]
      end

      final_teams = t_decision_team_slots[1..3].uniq.map { |slot| Team.find_by(starting_slot: slot) }

      result = Result.new(winning_team: final_teams.first, losing_team: final_teams.last, bracket_positions:)
      [result]
    end
  end

  def self.brackets
    @brackets ||= Bracket.all
  end
end
