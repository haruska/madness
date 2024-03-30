# frozen_string_literal: true

module ApplicationHelper
  def tournament
    @tournament ||= Tournament.field_64
  end

  def cache_key_for_bracket_list
    decisions = TournamentResult.decisions
    max_updated_at = Bracket.maximum(:updated_at).try(:utc).try(:iso8601)
    "brackets-list/all-#{decisions.last}-#{max_updated_at}"
  end

  def tournament_react_props(bracket = nil)
    props = {
      tournament: {
        gameDecisions: tournament.game_decisions.to_s,
        gameMask: tournament.game_mask.to_s,
        rounds: tournament.rounds.map do |round|
          {
            name: round.name,
            number: round.number,
            startDate: round.start_date.iso8601,
            endDate: round.end_date.iso8601,
            regions: round.regions
          }
        end
      },
      teams: Team.all.map do |team|
        {
          startingSlot: team.starting_slot,
          seed: team.seed,
          name: team.name
        }
      end
    }

    if bracket
      policy = policy(bracket)
      props[:bracket] = {
        id: bracket.id,
        name: bracket.name,
        gameDecisions: bracket.game_decisions.to_s,
        gameMask: 18_446_744_073_709_551_614.to_s,
        policy: {
          destroy: policy.destroy?
        }
      }

      props[:errors] = bracket.errors if bracket.errors
    end

    props
  end
end
