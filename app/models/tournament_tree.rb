# frozen_string_literal: true

class TournamentTree < BinaryDecisionTree::Tree
  alias championship root

  def initialize(depth = Round::COUNT)
    super(depth, node_class: Game)
  end

  def self.unmarshal(decisions, mask)
    marshalled_tree = BinaryDecisionTree::MarshalledTree.new(Round::COUNT, decisions, mask)
    marshalled_tree.to_tree(tree_class: self)
  end

  def marshal
    BinaryDecisionTree::MarshalledTree.from_tree(self)
  end

  def all_games_mask
    mask = 0
    (1...size).each do |i|
      mask |= 1 << i
    end
    mask
  end

  def complete?
    marshal.mask == all_games_mask
  end

  def incomplete?
    !complete?
  end

  def update_game(position, choice)
    at(position).decision = choice
  end

  def game_slots_for(round_number)
    depth_for = (1..depth).to_a.reverse.index(round_number) + 1
    depth_for.zero? ? [1] : ((2**(depth_for - 1))..((2**depth_for) - 1)).to_a
  end

  def select_games(game_slots = [])
    game_slots.map { |id| at(id) }
  end

  def round_for(round_number)
    select_games(game_slots_for(round_number))
  end

  def ==(other)
    other.class == self.class && other.marshal == marshal
  end

  alias eql? ==
end
