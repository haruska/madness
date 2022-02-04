# frozen_string_literal: true

class Game
  LEFT = 0
  RIGHT = 1

  attr_accessor :decision # nil, LEFT, or RIGHT
  attr_reader :tree, :slot # tree and bit position

  def initialize(tree, slot)
    @tree = tree
    @slot = slot
    @decision = nil
  end

  def value
    case decision
    when LEFT
      left.nil? ? left_position : left.value
    when RIGHT
      right.nil? ? right_position : right.value
    end
  end

  def leaf?
    left.nil? && right.nil?
  end

  def current_depth
    Math.log2(slot).floor + 1
  end

  def parent_position
    (slot.even? ? slot + 1 : slot) / 2
  end

  def left_position
    slot * 2
  end

  def right_position
    left_position + 1
  end

  def parent
    tree.at(parent_position)
  end

  def left
    tree.at(left_position)
  end

  def right
    tree.at(right_position)
  end

  def round_number
    rounds = (1..Round::COUNT).to_a.reverse
    rounds[current_depth - 1]
  end

  def round
    Round.by_number(round_number)
  end

  def region
    game_slots = tree.game_slots_for(round_number)
    return nil if game_slots.size < Team::REGIONS.size

    slice_size = game_slots.size / Team::REGIONS.size
    slices = game_slots.each_slice(slice_size).to_a
    Team::REGIONS.find { |region| slices[Team::REGIONS.index(region)].include?(slot) }
  end

  def championship?
    parent_position.zero?
  end

  def tournament_game
    tournament_tree.at(slot)
  end

  def next_slot
    return nil if championship?

    slot.even? ? 1 : 2
  end

  def next_game_slot
    championship? ? nil : parent_position
  end

  def team_one
    leaf? ? team_by_slot(left_position) : nil
  end

  def team_two
    leaf? ? team_by_slot(right_position) : nil
  end

  def first_team
    team_one || team_by_slot(left)
  end

  def second_team
    team_two || team_by_slot(right)
  end

  def team
    team_by_slot(self)
  end

  alias winner team

  def loser
    return nil if winner.blank?

    ([first_team, second_team] - [winner]).first
  end

  # def points(possible_game = nil)
  #   working_game = possible_game || tournament_game
  #
  #   if value.present? && working_game.value == value
  #     BracketPoint::POINTS_PER_ROUND[round_number] + team_seed
  #   else
  #     0
  #   end
  # end
  #
  # def possible_points
  #   if tournament_game.value.blank? && team.try(:still_playing?)
  #     BracketPoint::POINTS_PER_ROUND[round_number] + team_seed
  #   else
  #     points
  #   end
  # end

  def ==(other)
    other.class == self.class && other.state == state
  end

  alias eql? ==
  alias game_one left
  alias game_two right
  alias next_game parent

  delegate :hash, to: :state

  protected

  def state
    [tree, slot, value]
  end

  private

  def team_seed
    Team.seed(value)
  end

  def team_by_slot(in_slot)
    slot_number = in_slot.try(:value) || in_slot
    Team.find_by(starting_slot: slot_number)
  end

  def tournament
    Tournament.field64
  end

  def tournament_tree
    tournament.tree
  end
end
