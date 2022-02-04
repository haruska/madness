# frozen_string_literal: true

class TournamentTree
  DEPTH = Round::COUNT
  SIZE = 2**DEPTH

  ALL_GAMES_MASK = (1...SIZE).reduce(0) do |mask, i|
    mask |= 1 << i
    mask
  end

  attr_reader :games

  def initialize
    @games = Array.new(SIZE) { |i| i.zero? ? nil : Game.new(self, i) }
  end

  def championship
    games[1]
  end

  def self.unmarshal(decisions, mask)
    tree = new

    tree.games.each_with_index do |game, i|
      next if i.zero?

      current_position = 1 << i
      if (mask & current_position) != 0
        game.decision = (decisions & current_position).zero? ? 0 : 1
      end
    end

    tree
  end

  def marshal
    decisions = 0
    mask = 0

    games.each_with_index do |game, i|
      next if i.zero?

      unless game.decision.nil?
        mask |= 1 << i
        decisions |= game.decision << i
      end
    end

    [decisions, mask]
  end

  def complete?
    marshal.mask == ALL_GAMES_MASK
  end

  def incomplete?
    !complete?
  end

  def at(position)
    games[position]
  end

  def update_game(position, choice)
    games[position].decision = choice
  end

  def game_slots_for(round_number)
    depth_for = (1..DEPTH).to_a.reverse.index(round_number) + 1
    depth_for.zero? ? [1] : ((2**(depth_for - 1))..((2**depth_for) - 1)).to_a
  end

  def select_games(game_slots = [])
    game_slots.map { |id| games[id] }
  end

  def round_for(round_number)
    select_games(game_slots_for(round_number))
  end

  def ==(other)
    other.marshal == marshal
  end

  alias eql? ==
end
