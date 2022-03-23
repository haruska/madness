# frozen_string_literal: true

require 'net/http'

class EspnScores
  STATUS_SCHEDULED = 'STATUS_SCHEDULED'
  STATUS_IN_PROGRESS = 'STATUS_IN_PROGRESS'
  STATUS_FINAL = 'STATUS_FINAL'

  attr_reader :date

  def initialize(date)
    @date = date
  end

  def self.associate_teams
    tip_off = Tournament.field_64.tip_off.to_date
    first_round = new(tip_off).all_scores + new(tip_off + 1.day).all_scores

    raise "Didn't find 32 games" unless first_round.size == 32

    teams = Team.all.to_a

    first_round.each do |score|
      score_team_one, score_team_two = score[:teams].map { |t| [t[:seed], t[:abbrev]] }

      possible_team_one = teams.find { |t| t.seed == score_team_one.first && t.name.starts_with?(score_team_one[1].chars.first) }
      possible_team_two = teams.find { |t| t.seed == score_team_two.first && t.name.starts_with?(score_team_two[1].chars.first) }

      if possible_team_one && !possible_team_two
        possible_team_two = teams.find { |t| t.starting_slot == possible_team_one.starting_slot + 1 }
      elsif possible_team_two && !possible_team_one
        possible_team_one = teams.find { |t| t.starting_slot == possible_team_two.starting_slot - 1 }
      end

      possible_team_one&.update(score_team_id: score_team_one[1])
      possible_team_two&.update(score_team_id: score_team_two[1])
    end

    # Left over abbrev
    out = []
    first_round.each do |score|
      score[:teams].each do |team|
        out << [team[:seed], team[:abbrev]] if Team.find_by(score_team_id: team[:abbrev]).nil?
      end
    end

    out
  end

  def all_scores
    @all_scores ||= begin
      date_str = date.to_s.split('-').join
      api_url = URI("https://site.web.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?dates=#{date_str}&tz=America%2FNew_York")

      resp = Net::HTTP.get(api_url)
      events = JSON.parse(resp).to_h['events']

      events.map do |event|
        status = event.dig('status', 'type', 'name')

        teams = event['competitions'].first['competitors'].map do |competitor|
          {
            id: competitor['id'],
            seed: competitor.dig('curatedRank', 'current'),
            home_away: competitor['homeAway'],
            score: competitor['score'].to_i,
            abbrev: competitor.dig('team', 'abbreviation')
          }
        end

        { status:, teams: }
      end
    end
  end

  def scores(status)
    all_scores.filter { |s| s[:status] == status }
  end

  def update_tournament
    tournament = Tournament.field_64
    tip_off = tournament.tip_off.to_date

    scores(STATUS_FINAL).each do |score|
      score_teams = score[:teams]

      team_a = Team.find_by(score_team_id: score_teams[0][:abbrev])
      team_b = Team.find_by(score_team_id: score_teams[1][:abbrev])

      next if team_a.nil? || team_b.nil?

      winner = score_teams[0][:score] > score_teams[1][:score] ? team_a : team_b

      # if sibling slots, then first round. Update parent game
      if (tip_off == date || tip_off + 1.day == date) && (team_a.starting_slot - team_b.starting_slot).abs == 1
        decision = if team_a.starting_slot < team_b.starting_slot
                     winner == team_a ? 0 : 1
                   else # team_b in top slot
                     winner == team_b ? 0 : 1
                   end

        update_slot = team_a.starting_slot / 2
        tournament.update_game!(update_slot, decision) if tournament.decision_team_slots[update_slot].blank?

      # else look for two Tournament.decision_team_slots next to each other and update their parent
      else
        top_index = 62
        bottom_index = 63

        while top_index > 1
          top_slot = tournament.decision_team_slots[top_index]
          bottom_slot = tournament.decision_team_slots[bottom_index]

          if top_slot.present? && bottom_slot.present? && [top_slot, bottom_slot].sort == [team_a.starting_slot, team_b.starting_slot].sort
            decision = if team_a.starting_slot == top_slot
                         winner == team_a ? 0 : 1
                       else
                         winner == team_b ? 0 : 1
                       end

            update_slot = top_index / 2
            tournament.update_game!(update_slot, decision) if tournament.decision_team_slots[update_slot].blank?

            break
          end

          top_index -= 2
          bottom_index -= 2
        end
      end
    end
  end
end
