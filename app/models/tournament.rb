# frozen_string_literal: true

class Tournament < ApplicationRecord
  def self.field64
    first
  end

  delegate :championship, to: :tree

  def started?
    DateTime.current > tip_off
  end

  def finished?
    num_games_remaining.zero?
  end

  def start_eliminating?
    num_games_remaining < 16 && num_games_remaining.positive?
  end

  def num_games
    63
  end

  def num_games_played
    game_mask.to_s(2).count('1')
  end

  def num_games_remaining
    num_games - num_games_played
  end

  def game_slots_for(round_number, region = nil)
    game_ids = tree.game_slots_for(round_number)

    if region.present? && game_ids.size >= Team::REGIONS.size
      slice_size = game_ids.size / Team::REGIONS.size
      slice_index = Team::REGIONS.index(region)
      slices = game_ids.each_slice(slice_size).to_a
      slices[slice_index]
    else
      game_ids
    end
  end

  def rounds
    @rounds ||= Round.all
  end

  def round_name_date_pairs
    rounds.map do |round|
      date_range_string = round.start_date.strftime('%b %e')
      date_range_string += "-#{round.end_date.strftime('%e')}" if round.start_date != round.end_date
      [round.name, date_range_string]
    end
  end

  def round_for(round_number, region = nil)
    tree.select_games(game_slots_for(round_number, region))
  end

  def tree
    TournamentTree.unmarshal(game_decisions, game_mask)
  end

  def update_game(position, choice)
    working_tree = tree
    working_tree.update_game(position, choice)

    marshalled_tree = working_tree.marshal
    self.game_decisions = marshalled_tree[0]
    self.game_mask = marshalled_tree[1]
  end

  def update_game!(position, choice)
    update_game(position, choice)
    save!
  end

  def games
    working_tree = tree
    (1..num_games).map { |slot| working_tree.at(slot) }
  end

  def games_hash
    games.map do |node|
      {
        slot: node.slot,
        teamOne: team_hash(node.team_one),
        teamTwo: team_hash(node.team_two),
        winningTeam: team_hash(node.team),
        gameOneId: node.left_position,
        gameTwoId: node.right_position,
        nextGameId: node.next_game_slot,
        nextSlot: node.next_slot,
        choice: node.decision
      }
    end
  end

  private

  def team_hash(team)
    team.present? ? { id: team.id, seed: team.seed, name: team.name } : nil
  end
end
