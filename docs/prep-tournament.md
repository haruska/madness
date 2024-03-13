# Seeding tournament and team data

The tournament and teams are set via `seeds.rb`.

1. Set the correct tip off time for the current year
2. Update the team list to the correct teams in **slot order**

* adjust data/teams.csv
* check/adjust region order in `team.rb`
* keep team names under 12 chars

3. Run `bin/rails runner db/seeds.rb`