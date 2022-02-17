# frozen_string_literal: true

module TournamentHelpers
  def tournament_unstarted
    tournament = Tournament.field_64
    tournament.game_decisions = 0
    tournament.game_mask = 0
    tournament.save!
    tournament
  end

  def tournament_started
    tournament = tournament_unstarted
    tournament.update!(tip_off: 1.week.ago.utc.change(usec: 0))
    tournament
  end

  def tournament_with_first_two_rounds_completed
    tournament = tournament_started
    (1..2).each do |round|
      tournament.round_for(round).each do |game|
        tournament.update_game(game.slot, [0, 1].sample)
      end
    end
    tournament.save!
    tournament.reload
  end

  def tournament_in_final_four
    tournament = tournament_with_first_two_rounds_completed
    tournament.tip_off = 2.weeks.ago.utc.change(usec: 0)

    (3..4).each do |round|
      tournament.round_for(round).each do |game|
        tournament.update_game(game.slot, [0, 1].sample)
      end
    end
    tournament.save!
    tournament
  end

  def tournament_completed
    tournament = tournament_unstarted
    tournament.tip_off = 4.weeks.ago.utc.change(usec: 0)

    tournament.num_games.times do |i|
      tournament.update_game(i + 1, [0, 1].sample)
    end
    tournament.save!
    tournament
  end
end

RSpec.configure do |config|
  config.include TournamentHelpers
end
