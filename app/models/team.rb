# frozen_string_literal: true

class Team
  include ActiveAttr::Model

  EAST = 'East'
  WEST = 'West'
  MIDWEST = 'Midwest'
  SOUTH = 'South'

  REGIONS = [SOUTH, EAST, MIDWEST, WEST].freeze
  SEED_ORDER = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15].freeze

  attribute :starting_slot
  attribute :name
  attribute :score_team_id

  validates :name, length: { maximum: 15 }

  def self.all
    TEAMS
  end

  def self.by_starting_slot(starting_slot)
    Team.all[starting_slot - 64]
  end

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
    Rails.cache.fetch("#{Tournament.field_64.cache_key}/#{starting_slot}/still_playing") do
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
