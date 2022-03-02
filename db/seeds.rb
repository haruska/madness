# frozen_string_literal: true

Rails.logger.debug 'Running seeds.rb...'

# ensure admin user
admin_name = Rails.application.credentials.admin_name!
admin_email = Rails.application.credentials.admin_email!
User.find_or_create_by!(name: admin_name, email: admin_email, admin: true)

Tournament.field_64 || Tournament.create!(
  num_rounds: 6,
  tip_off: Time.parse("March 21, #{Time.current.year} 16:00 UTC").utc
)

if Team.count.zero?
  team_names = [
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
    'PlayIn E16',
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
    'PlayIn W16',
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
    'Iona',
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

  team_names.each_with_index do |name, i|
    Team.create name:, starting_slot: i + 64
  end
end
