# frozen_string_literal: true

puts 'Running seeds.rb...' # rubocop:disable Rails/Output

# ensure admin user
admin_name = ENV['ADMIN_NAME']
admin_email = ENV['ADMIN_EMAIL']
User.find_or_create_by!(name: admin_name, email: admin_email, admin: true)

# Find or create the tournament and update the tip off time
tip_off = Time.parse('March 17, 2022 16:00 UTC').utc
tournament = Tournament.field_64 || Tournament.create!(num_rounds: 6, tip_off:)
tournament.update(tip_off:)

team_names = [
  # West
  'Gonzaga',
  'Georgia St',
  'Boise St',
  'Memphis',
  'UConn',
  'New Mex St',
  'Arkansas',
  'Vermont',
  'Alabama',
  'PlayIn W11',
  'Texas Tech',
  'Montana St',
  'Michigan St',
  'Davidson',
  'Duke',
  'CS Fullerton',
  # East
  'Baylor',
  'Norfolk St',
  'N Carolina',
  'Marquette',
  "St Mary's",
  'PlayIn E12',
  'UCLA',
  'Akron',
  'Texas',
  'VTech',
  'Purdue',
  'Yale',
  'Murray St',
  'San Fran',
  'Kentucky',
  "St Peter's",
  # South
  'Arizona',
  'PlayIn S16',
  'Seton Hall',
  'TCU',
  'Houston',
  'UAB',
  'Illinois',
  'Chattanooga',
  'Colorado St',
  'Michigan',
  'Tennessee',
  'Longwood',
  'Ohio St',
  'Loyola Chi',
  'Villanova',
  'Delaware',
  # Midwest
  'Kansas',
  'PlayIn MW16',
  'San Diego St',
  'Creighton',
  'Iowa',
  'Richmond',
  'Providence',
  'S Dakota St',
  'LSU',
  'Iowa St',
  'Wisconsin',
  'Colgate',
  'USC',
  'Miami',
  'Auburn',
  'Jacksonvl St'
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
