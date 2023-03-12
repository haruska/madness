# frozen_string_literal: true

puts 'Running seeds.rb...' # rubocop:disable Rails/Output

# ensure admin user
admin_name = ENV.fetch('ADMIN_NAME', nil)
admin_email = ENV.fetch('ADMIN_EMAIL', nil)
admin_password = ENV.fetch('ADMIN_PASSWORD', nil)
User.create_with(password: admin_password).find_or_create_by!(name: admin_name, email: admin_email, admin: true)

# Find or create the tournament and update the tip off time
tip_off = Rails.env.test? ? 2.weeks.from_now : Time.parse('March 16, 2023 16:00 UTC').utc
tournament = Tournament.field_64 || Tournament.create!(num_rounds: 6, tip_off:)
tournament.update(tip_off:)

team_names = [
  # South
  'Alabama',
  'Play-In S16',
  'Maryland',
  'W Virginia',
  'San Diego St',
  'Charleston',
  'Virginia',
  'Furman',
  'Creighton',
  'NC State',
  'Baylor',
  'UC Santa Bar',
  'Missouri',
  'Utah St',
  'Arizona',
  'Princeton',
  # East
  'Purdue',
  'Play-In E16',
  'Memphis',
  'Fla Atlantic',
  'Duke',
  'Oral Roberts',
  'Tennessee',
  'Louisiana',
  'Kentucky',
  'Providence',
  'Kansas St',
  'Montana St',
  'Michigan St',
  'USC',
  'Marquette',
  'Vermont',
  # Midwest
  'Houston',
  'N Kentucky',
  'Iowa',
  'Auburn',
  'Miami',
  'Drake',
  'Indiana',
  'Kent St',
  'Iowa St',
  'Play-In MW11',
  'Xavier',
  'Kennesaw St',
  'Texas A&M',
  'Penn St',
  'Texas',
  'Colgate',
  # West
  'Kansas',
  'Howard',
  'Arkansas',
  'Illinois',
  'St Marys',
  'VCU',
  'UConn',
  'Iona',
  'TCU',
  'Plan-In W11',
  'Gonzaga',
  'Grand Canyon',
  'Northwestern',
  'Boise St',
  'UCLA',
  'UNC Ashvil'
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
