# frozen_string_literal: true

class Tournament
  include ActiveAttr::Model

  attribute :tip_off, default: -> { Rails.env.test? ? 2.weeks.from_now : Time.iso8601(ENV.fetch('TIP_OFF', '2024-03-21T21:15:00Z')) }
  attribute :num_rounds, type: Integer, default: 6
  attribute :game_decisions, type: Integer, default: 0
  attribute :game_mask, type: Integer, default: 0

  def self.field_64
    decisions = TournamentResult.decisions
    Tournament.new(game_decisions: decisions.first, game_mask: decisions.last)
  end

  def teams
    TEAMS
  end

  def team_by_slot(slot)
    teams[slot - 64]
  end

  def started?
    Time.current > tip_off
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
    Team.seed_for_slot(starting_slot)
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
    save
  end

  def save
    res = TournamentResult.results
    res.game_decisions = game_decisions
    res.game_mask = game_mask
    res.save
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

  def self.slots_to_decisions(slots)
    decisions = 0
    slots.to_enum.with_index.reverse_each do |slot, i|
      next if i.zero?

      decision = if i >= 32
                   slot.even? ? 0 : 1
                 else
                   slot == slots[i * 2] ? 0 : 1
                 end

      decisions |= decision << i
    end

    decisions
  end

  def decision_team_slots
    @decision_team_slots ||= Rails.cache.fetch("#{cache_key}/decision_team_slots") do
      decisions = game_decisions
      result = Array.new(64)

      (1..63).to_a.reverse.each do |i|
        current_position = 1 << i
        next unless current_position.anybits?(game_mask)

        decision = decisions.nobits?(current_position) ? 0 : 1
        position = (i * 2) + decision

        result[i] = i >= 32 ? position : result[position]
      end

      result
    end
  end

  # # for testing
  # def mock_unstarted
  #   self.game_mask = 0
  #   self.tip_off = 2.weeks.from_now
  #   save
  # end
  #
  # def mock_first_two_rounds_completed
  #   self.game_mask = 0
  #   self.tip_off = 1.week.ago
  #   (1..2).each do |round|
  #     round_for(round).each do |game|
  #       update_game(game.slot, [0, 1].sample)
  #     end
  #   end
  #   save
  # end
  #
  # def mock_in_final_four
  #   self.game_mask = 0
  #   self.tip_off = 2.weeks.ago
  #   (1..4).each do |round|
  #     round_for(round).each do |game|
  #       update_game(game.slot, [0, 1].sample)
  #     end
  #   end
  #   save
  # end
  #
  # def mock_completed
  #   self.tip_off = 3.weeks.ago
  #   num_games.times { |i| update_game(i + 1, [0, 1].sample) }
  #   save
  # end

  def cache_key
    ActiveSupport::Digest.hexdigest(to_json)
  end

  private

  def team_hash(team)
    team.present? ? { id: team.id, seed: team.seed, name: team.name } : nil
  end
end
