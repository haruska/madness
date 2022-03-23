# frozen_string_literal: true

class Eliminations
  def results(t_decision_team_slots)
    nil_slot = t_decision_team_slots.rindex(nil)

    if nil_slot && !nil_slot.zero?
      tdts = t_decision_team_slots.clone
      tdts[nil_slot] = tdts[nil_slot * 2] # decision == 0
      decision_zero = results(tdts)

      tdts = t_decision_team_slots.clone
      tdts[nil_slot] = tdts[(nil_slot * 2) + 1] # decision == 1
      decision_one = results(tdts)

      decision_zero + decision_one
    else
      tournament_decisions = Tournament.slots_to_decisions(t_decision_team_slots)

      tuples = brackets.map do |bracket|
        [bracket.points_for(t_decision_team_slots), bracket.id]
      end

      tuples.sort_by! { |tuple| -tuple[0] }

      rank = 1
      tuples.map.with_index do |tuple, i|
        rank = i + 1 unless i.zero? || tuple[0] == tuples[i - 1][0]
        [tournament_decisions, rank, *tuple]
      end
    end
  end

  def best_possible_finishes
    result = results(Tournament.field_64.decision_team_slots).group_by { |tuple| tuple[-1] }
    result.map do |bracket_id, tuples|
      best_finish = tuples.map { |tuple| tuple[1] }.min
      [bracket_id, best_finish]
    end
  end

  def brackets
    @brackets ||= Bracket.all
  end

  def tournament
    @tournament ||= Tournament.field_64
  end
end
