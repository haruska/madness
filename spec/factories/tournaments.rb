# frozen_string_literal: true

FactoryBot.define do
  factory :tournament do
    tip_off { 1.week.ago }

    trait(:with_teams) do
      after(:create) do |_tournament|
        64.times do |i|
          Team.create_with(name: Faker::Name.unique).find_or_create_by(starting_slot: 64 + i)
        end
      end
    end

    trait :with_first_two_rounds_completed do
      tip_off { 1.week.ago }

      after(:create) do |tournament|
        (1..2).each do |round|
          tournament.round_for(round).each do |game|
            tournament.update_game(game.slot, [0, 1].sample)
          end
        end
        tournament.save
      end
    end

    trait :in_final_four do
      tip_off { 2.weeks.ago }

      after(:create) do |tournament|
        (1..4).each do |round|
          tournament.round_for(round).each do |game|
            tournament.update_game(game.slot, [0, 1].sample)
          end
        end
        tournament.save
      end
    end

    trait :completed do
      tip_off { 4.weeks.ago }

      after(:create) do |tournament|
        tournament.num_games.times do |i|
          tournament.update_game(i + 1, [0, 1].sample)
        end
        tournament.save
      end
    end

    trait :started do
      tip_off { 1.week.ago }
    end

    trait :not_started do
      tip_off { 4.days.from_now }
    end
  end
end
