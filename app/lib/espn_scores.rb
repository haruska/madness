# frozen_string_literal: true

require 'net/http'

class EspnScores
  STATUS_SCHEDULED = 'STATUS_SCHEDULED'
  STATUS_IN_PROGRESS = 'STATUS_IN_PROGRESS'
  STATUS_FINAL = 'STATUS_FINAL'

  def self.associate_teams # rubocop:disable Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity
    tip_off = Tournament.field_64.tip_off.to_date
    first_round = EspnScores.scores_for(tip_off) + EspnScores.scores_for(tip_off + 1.day)

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

  def self.scores_for(date)
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
