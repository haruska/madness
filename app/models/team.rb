# frozen_string_literal: true

class Team < ApplicationRecord
  REGIONS = %i[east west south midwest].freeze

  validates :name, presence: true, uniqueness: true, length: { maximum: 15 }

  validates :starting_slot,
            numericality: { only_integer: true, greater_than_or_equal_to: 64, less_than_or_equal_to: 128 },
            uniqueness: true,
            presence: true

  def region
    REGIONS[(starting_slot - 64) / 16]
  end

  def seed
    seeds = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15]
    seeds[(starting_slot - 64) % 16]
  end

  def first_game
    Tournament.field64.tree.at(starting_slot / 2)
  end

  def still_playing?
    game = first_game
    while game.present? && !game.decision.nil?
      return false if game.value != starting_slot

      game = game.parent
    end
    true
  end

  def eliminated?
    !still_playing?
  end
end
