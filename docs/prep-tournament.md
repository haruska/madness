# Seeding tournament and team data

The tournament and teams are set via `seeds.rb`.

1. Set the correct tip off time for the current year
2. Update the team list to the correct teams in **slot order**

* adjust data/teams.csv
* check/adjust region order in `team.rb`
* keep team names under 12 chars

3. Run `bin/rails runner db/seeds.rb`

# Reset user logins and delete all brackets

From rails console:

```ruby
User.update_all(sign_in_count: 0, current_sign_in_at: nil, last_sign_in_at: nil, current_sign_in_ip: nil, last_sign_in_ip: nil)
Bracket.delete_all
```