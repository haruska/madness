# frozen_string_literal: true

class RemoveSeeds < ActiveRecord::Migration[7.0]
  def up
    remove_column :teams, :tournament_id
    remove_column :teams, :seed
    remove_column :teams, :region
    change_column :teams, :starting_slot, :integer, null: false
    remove_index :teams, :starting_slot
    add_index :teams, :starting_slot, unique: true
  end
end
