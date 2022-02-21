# frozen_string_literal: true

FactoryBot.define do
  factory :bracket do
    user
    name { Faker::Company.unique.name }
    tie_breaker { Faker::Number.between(from: 100, to: 200) }
  end
end
