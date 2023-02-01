class PossibleOutcomeSet
  include ActiveAttr::Model

  attribute :exclude_eliminated

  attribute :teams_attr
  attribute :tournament_tree_attr
  attribute :brackets_cache_attr
  attribute :bracket_trees_cache_attr
  attribute :all_games_mask_attr
  attribute :variable_slots_attr

  def tournament
    Tournament.field_64
  end

  def teams
    self.teams_attr ||= Team.all.index_by(&:starting_slot)
  end

  def tournament_tree
    self.tournament_tree_attr ||= tournament.tree
  end

  def all_games_mask
    self.all_games_mask_attr ||= tournament_tree.all_games_mask
  end

  def fixed_slot_mask
    to_slot_bits(tournament.game_mask)
  end

  def fixed_slot_bits
    to_slot_bits(tournament.game_decisions)
  end

  def to_play_games_mask
    (2**tournament.num_games_remaining) - 1
  end

  def variable_slots
    if variable_slots_attr.nil?
      self.variable_slots_attr ||= []
      tournament.num_games.times do |i|
        slot = 1 << i
        self.variable_slots_attr << i if (fixed_slot_mask & slot).zero? # if not already played
      end
    end

    variable_slots_attr
  end

  def slot_bits_for(variable_bits)
    slot_bits = fixed_slot_bits
    variable_slots.each do |slot|
      bit = variable_bits & 1
      slot_bits |= (bit << slot)

      variable_bits = variable_bits >> 1
    end
    slot_bits
  end

  def all_outcomes
    Array.new((2**tournament.num_games_remaining)) do |variable_bits|
      outcome_for(slot_bits_for(variable_bits))
    end
  end

  def outcome_for(slot_bits)
    PossibleOutcome.new possible_outcome_set: self, game_decisions: to_game_decisions(slot_bits)
  end

  def all_outcomes_by_winners
    all_outcomes_hash = all_outcomes.each_with_object({}) do |outcome, winners_champ_hash|
      championship = outcome.tree.championship
      best_possible = outcome.best_possible_by_rank

      winners_champ_hash[best_possible] ||= []
      winners_champ_hash[best_possible] << championship
    end

    all_outcomes_hash.sort_by { |_, championships| championships.size }.reverse.map do |best_brackets, championships|
      Possibility.new championships:, best_brackets:
    end
  end

  def brackets_cache
    @brackets_cache ||= Bracket.all
  end

  def bracket_trees_cache(bracket)
    self.bracket_trees_cache_attr ||= {}
    bracket_trees_cache_attr[bracket.id] ||= bracket.tree
  end

  private

  def to_slot_bits(game_decisions)
    game_decisions >> 1
  end

  def to_game_decisions(slot_bits)
    slot_bits << 1
  end
end
