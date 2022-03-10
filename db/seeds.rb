# frozen_string_literal: true

puts 'Running seeds.rb...' # rubocop:disable Rails/Output

# ensure admin user
admin_name = ENV['ADMIN_NAME']
admin_email = ENV['ADMIN_EMAIL']
User.find_or_create_by!(name: admin_name, email: admin_email, admin: true)

# Find or create the tournament and update the tip off time
tip_off = Time.parse('March 17, 2022 12:00 ET').utc
tournament = Tournament.field_64 || Tournament.create!(num_rounds: 6, tip_off:)
tournament.update(tip_off:)

team_names = [
  # East
  'Kansas',
  'Lng Beach St',
  'Seton Hall',
  'Murray St',
  'Houston',
  'PlayIn E12',
  'Illinois',
  'Toledo',
  'Ohio St',
  'Notre Dame',
  'Villanova',
  'Longwood',
  'USC',
  'Miami',
  'Kentucky',
  'Georgia St',
  # West
  'Gonzaga',
  'PlayIn W16',
  'TCU',
  'Memphis',
  'UConn',
  'North Texas',
  'Arkansas',
  'Vermont',
  'Alabama',
  'Rutgers',
  'Texas Tech',
  'Seattle',
  'Colorado St',
  'Loyola Chi',
  'Wisconsin',
  'St Peters',
  # South
  'Baylor',
  'Norfolk St',
  'Michigan St',
  'San Fancisco',
  'LSU',
  'S Dakota St',
  'UCLA',
  'Princeton',
  'Iowa',
  'Creighton',
  'Tennessee',
  'Colgate',
  'Boise St',
  'Michigan',
  'Duke',
  'Jksnvile St',
  # Midwest
  'Arizona',
  'PlayIn MW16',
  'N Carolina',
  'Iowa St',
  'Texas',
  'PlayIn MW12',
  'Providence',
  'Chattanooga',
  "St Mary's",
  'Davidson',
  'Purdue',
  'Montana St',
  'Marquette',
  'San Diego St',
  'Auburn',
  'Delaware'
]

team_names.each_with_index do |name, i|
  starting_slot = i + 64
  team = Team.create_with(name:).find_or_create_by!(starting_slot:)

  puts "#{name} is more than 12 chars" if name.chars.length > 12 # rubocop:disable Rails/Output

  if team.name != name
    # Team in slot <starting_slot> changed
    team.update!(name:, score_team_id: nil)
  end
end
