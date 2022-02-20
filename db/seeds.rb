# frozen_string_literal: true

Rails.logger.debug 'Running seeds.rb...'

# ensure admin user
admin_name = Rails.application.credentials.admin_name!
admin_email = Rails.application.credentials.admin_email!
User.find_or_create_by!(name: admin_name, email: admin_email, admin: true)

tournament = Tournament.field_64 || Tournament.create!(
  num_rounds: 6,
  tip_off: Time.parse("March 21, #{Time.current.year} 16:00 UTC").utc
)

if Team.count.zero?
  team_name_hash = {
    Team::EAST => [
      'Duke',
      'Michigan St',
      'LSU',
      'Va Tech',
      'Miss St',
      'Maryland',
      'Louisville',
      'VCU',
      'UCF',
      'Minnesota',
      'PlayIn E11',
      'Liberty',
      'St Louis',
      'Yale',
      'Bradley',
      'PlayIn E16'
    ],
    Team::WEST => [
      'Gonzaga',
      'Michigan',
      'Texas Tech',
      'Florida St',
      'Marquette',
      'Buffalo',
      'Nevada',
      'Syracuse',
      'Baylor',
      'Florida',
      'PlayIn W11',
      'Murray St',
      'Vermont',
      'N Kentucky',
      'Montana',
      'PlayIn W16'
    ],
    Team::MIDWEST => [
      'N Carolina',
      'Kentucky',
      'Houston',
      'Kansas',
      'Auburn',
      'Iowa St',
      'Wofford',
      'Utah St',
      'Washington',
      'Seton Hall',
      'Ohio St',
      'New Mex St',
      'Northeastern',
      'Georgia St',
      'Abilene Chr',
      'Iona'
    ],
    Team::SOUTH => [
      'Virgina',
      'Tennessee',
      'Purdue',
      'Kansas St',
      'Wisconsin',
      'Villanova',
      'Cincinnati',
      'Ole Miss',
      'Oklahoma',
      'Iowa',
      "St Mary's",
      'Oregon',
      'UC Irvine',
      'Old Dominion',
      'Colgate',
      'G-Webb'
    ]
  }

  team_name_hash.each do |region, team_names|
    team_names.each_with_index do |name, i|
      tournament.teams.create region:, seed: i + 1, name:
    end
  end

  team_slot = tournament.teams.count

  sort_order = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15]

  Team::REGIONS.each do |region|
    sort_order.each_slice(2) do |i, j|
      team_one = tournament.teams.find_by(region:, seed: i)
      team_two = tournament.teams.find_by(region:, seed: j)

      team_one.update(starting_slot: team_slot)
      team_two.update(starting_slot: team_slot + 1)

      team_slot += 2
    end
  end
end
