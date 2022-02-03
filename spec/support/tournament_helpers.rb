# frozen_string_literal: true

module TournamentHelpers
  def tournament_started
    tournament = Tournament.field64
    tournament.update!(tip_off: 1.week.ago)
    tournament
  end

  def tournament_with_first_two_rounds_completed
    tournament = Tournament.field64
    tournament.tip_off = 1.week.ago
    (1..2).each do |round|
      tournament.round_for(round).each do |game|
        tournament.update_game(game.slot, [0, 1].sample)
      end
    end
    tournament.save!
    tournament
  end

  def tournament_in_final_four
    tournament = Tournament.field64
    tournament.tip_off = 2.weeks.ago

    (1..4).each do |round|
      tournament.round_for(round).each do |game|
        tournament.update_game(game.slot, [0, 1].sample)
      end
    end
    tournament.save
    tournament
  end

  def tournament_completed
    tournament = Tournament.field64
    tournament.tip_off = 4.weeks.ago

    tournament.num_games.times do |i|
      tournament.update_game(i + 1, [0, 1].sample)
    end
    tournament.save
    tournament
  end
end

RSpec.configure do |config|
  config.include TournamentHelpers
end
