# frozen_string_literal: true

require 'net/http'

class EspnScores
  STATUS_SCHEDULED = 'STATUS_SCHEDULED'
  STATUS_IN_PROGRESS = 'STATUS_IN_PROGRESS'
  STATUS_FINAL = 'STATUS_FINAL'

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
