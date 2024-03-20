# frozen_string_literal: true

class TournamentResult < ApplicationRecord
  DECISIONS_KEY = 'tr_decisions_ck'
  MASK_KEY = 'tr_mask_ck'
  NUM_GAMES = 63

  after_save :update_cache

  after_update do |tournament_result|
    UpdateBestFinishesJob.perform_later if tournament_result.num_games_remaining < 16
  end

  def self.results
    first_or_create
  end

  def self.decisions
    res = Rails.cache.read_multi(DECISIONS_KEY, MASK_KEY)
    if res[DECISIONS_KEY].nil? || res[MASK_KEY].nil?
      results.send(:update_cache)
    else
      [res[DECISIONS_KEY], res[MASK_KEY]]
    end
  end

  def num_games_played
    game_mask.to_s(2).count('1')
  end

  def num_games_remaining
    NUM_GAMES - num_games_played
  end

  protected

  def update_cache
    Rails.cache.write_multi({
                              DECISIONS_KEY => game_decisions,
                              MASK_KEY => game_mask
                            })

    [game_decisions, game_mask]
  end
end
