# frozen_string_literal: true

class Tournament < ApplicationRecord
  has_many :teams, dependent: :destroy

  accepts_nested_attributes_for :teams

  def self.field_64
    Tournament.find_by(num_rounds: 6)
  end

  def started?
    DateTime.current > tip_off
  end

  def finished?
    num_games_remaining.zero?
  end

  def start_eliminating?
    num_games_remaining < 16 && num_games_remaining.positive?
  end

  delegate :championship, to: :tree

  def num_games
    (2**num_rounds) - 1
  end

  def num_games_played
    game_mask.to_s(2).count('1')
  end

  def num_games_remaining
    num_games - num_games_played
  end

  def team_seed(starting_slot)
    @team_seeds ||= teams.each_with_object({}) do |val, acc|
      acc[val.starting_slot] = val.seed
    end

    @team_seeds[starting_slot]
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
    (1..num_rounds).to_a.map { |n| Round.new number: n, tournament: self }
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
    TournamentTree.unmarshal(self, game_decisions, game_mask)
  end

  def update_game(position, choice)
    working_tree = tree
    working_tree.update_game(position, choice)

    marshalled_tree = working_tree.marshal
    self.game_decisions = marshalled_tree.decisions
    self.game_mask = marshalled_tree.mask
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

  def decision_team_slots
    @decision_team_slots ||= begin
      decisions = game_decisions
      result = Array.new(64)

      (1..63).to_a.reverse.each do |i|
        current_position = 1 << i
        next unless (current_position & game_mask) != 0

        decision = (decisions & current_position).zero? ? 0 : 1
        position = (i * 2) + decision

        result[i] = i >= 32 ? position : result[position]
      end

      result
    end
  end

  # for testing
  def mock_unstarted
    self.game_mask = 0
    self.tip_off = 2.weeks.from_now
    save
  end

  def mock_first_two_rounds_completed
    self.game_mask = 0
    self.tip_off = 1.week.ago
    (1..2).each do |round|
      round_for(round).each do |game|
        update_game(game.slot, [0, 1].sample)
      end
    end
    save
  end

  def mock_in_final_four
    self.game_mask = 0
    self.tip_off = 2.weeks.ago
    (1..4).each do |round|
      round_for(round).each do |game|
        update_game(game.slot, [0, 1].sample)
      end
    end
    save
  end

  def mock_completed
    self.tip_off = 3.weeks.ago
    num_games.times { |i| update_game(i + 1, [0, 1].sample) }
    save
  end

  private

  def team_hash(team)
    team.present? ? { id: team.id, seed: team.seed, name: team.name } : nil
  end
end
