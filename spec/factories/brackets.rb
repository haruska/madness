# frozen_string_literal: true

FactoryBot.define do
  factory :bracket do
    user
    name { Faker::Company.unique.name }
    tie_breaker { Faker::Number.between(from: 100, to: 200) }

    trait :completed do
      after(:build) do |bracket|
        game_decisions = 0
        Tournament.field_64.num_games.times do |i|
          game_decisions |= 1 << (i + 1) if [0, 1].sample == 1
        end
        bracket.game_decisions = game_decisions
      end
    end
  end
end
