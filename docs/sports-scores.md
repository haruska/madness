# Updating Game Scores

## History 

We used to use a gem called [espn-scraper](https://github.com/haruska/espn-scraper) which is a fork of [aj0strow/espn-scraper](https://github.com/aj0strow/espn-scraper) but it is defunkt and no longer calls the right API.


## Reverse engineering the API

If you navigate to the [ESPN Scoreboard](https://www.espn.com/mens-college-basketball/scoreboard) with Chrome dev tools on, in the Network Tab you can search for text. Search for a team name to get various API calls that had it in the response. 

Here is one:

https://site.web.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?region=us&lang=en&contentorigin=espn&limit=300&calendartype=blacklist&includeModules=videos%2Ccards&dates=20220317&tz=America%2FNew_York&buyWindow=1m&showAirings=buy%2Clive&showZipLookup=true


The Preview tab of the response is useful. You can right-click and "expand all" to see interesting data.

The path `events` is an array of games. for each game there seems to be a shape:

* event.status.type.name is an enum of game states (`STATUS_FINAL` is the finalized game)

* event.competitions[0].competitors is a 2-element array of teams
    * .id is the int ID of the team 
    * .curatedRank.current is the seed
    * .homeAway is "home" or "away"
    * .score is a string with the current score
    * .team.abbreviation is an abbreviated name
    * .team.displayName is a long team name
    * .team.shortDisplayName is a standard name
    * .team.name is a mascot name
    * .team.logo is a link to a logo png file

Other interesting fields not needed for this project:

* event.odds is an array with the spread and o/u

We can shorten the url a bit:

```bash
curl 'https://site.web.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?dates=20220317&tz=America%2FNew_York'
```

Now, a bit of ruby to get the data we want:

```ruby
require 'net/http'

class EspnScores
  def self.scores_for(date)
    api_url = URI("https://site.web.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?dates=#{date}&tz=America%2FNew_York")

    resp = Net::HTTP.get(api_url)
    events = JSON.parse(resp).to_h.with_indifferent_access[:events]

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
```

## Associating Teams with ESPN teams

For ESPN on each game we know the seed, abbreviation, and who they're playing. As a first pass, we can just take the seed number, compare the first char of the abbreviation to the 4 teams with the same seed and assign if it matches.

If needed, we can do it in pairs. For each pair of teams, find the 2 abbreviation first letters that match the pair/slots.

This should allow a fairly accurate script.

Grab the scores for thursday and friday:

```ruby
first_round = EspnScores.scores_for(Date.today) + EspnScores.scores_for(Date.tomorrow)
first_round.size # should == 32

teams = Team.all.to_a


first_round.each do |score|
  score_team_one, score_team_two = score[:teams].map {|t| [t[:seed], t[:abbrev]]}


  possible_team_one = teams.find {|t| t.seed == score_team_one.first && t.name.starts_with?(score_team_one[1].chars.first)}
  possible_team_two = teams.find {|t| t.seed == score_team_two.first && t.name.starts_with?(score_team_two[1].chars.first)}

  if possible_team_one && !possible_team_two
    possible_team_two = teams.find {|t| t.starting_slot == possible_team_one.starting_slot + 1}
  elsif possible_team_two && !possible_team_one
    possible_team_one = teams.find {|t| t.starting_slot == possible_team_two.starting_slot - 1}
  end

  possible_team_one&.update(score_team_id: score_team_one[1])
  possible_team_two&.update(score_team_id: score_team_two[1])
end

#Left over abbrev
out = ["Unused Abbreviations: "]
first_round.each do |score|
  score[:teams].each do |team|
    if Team.find_by(score_team_id: team[:abbrev]).nil?
      out << "#{team[:seed]}, #{team[:abbrev]}"
    end
  end
end

out.each {|line| puts line}
```