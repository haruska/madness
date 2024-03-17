# frozen_string_literal: true

puts 'Running seeds.rb...' # rubocop:disable Rails/Output

# ensure admin user
admin_name = ENV.fetch('ADMIN_NAME', nil)
admin_email = ENV.fetch('ADMIN_EMAIL', nil)
admin_password = ENV.fetch('ADMIN_PASSWORD', nil)
User.create_with(password: admin_password).find_or_create_by!(name: admin_name, email: admin_email, admin: true)
