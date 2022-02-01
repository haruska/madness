# frozen_string_literal: true

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryBot.define do
  factory :team do
    sequence(:starting_slot) { |n| n + 63 }
    name { Faker::Name }
  end
end
