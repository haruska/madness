# frozen_string_literal: true

class Team < ApplicationRecord
  EAST = 'East'
  WEST = 'West'
  MIDWEST = 'Midwest'
  SOUTH = 'South'

  REGIONS = [WEST, EAST, SOUTH, MIDWEST].freeze
  SEED_ORDER = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15].freeze

  validates :name, length: { maximum: 15 }

  def self.seed_for_slot(starting_slot)
    SEED_ORDER[starting_slot % 16]
  end

  def seed
    Team.seed_for_slot(starting_slot)
  end

  def region
    REGIONS[(starting_slot - 64) / 16]
  end

  def tournament
    Tournament.field_64
  end

  def first_game
    tournament.tree.at(starting_slot / 2)
  end

  def still_playing?
    @still_playing ||= Rails.cache.fetch("#{Tournament.field_64.cache_key_with_version}/#{starting_slot}/still_playing") do
      dts = Tournament.field_64.decision_team_slots
      slot = starting_slot / 2
      until dts[slot].nil?
        return false if dts[slot] != starting_slot

        slot /= 2
      end
      true
    end
  end

  def eliminated?
    !still_playing?
  end
end
