# frozen_string_literal: true

class CreateTeams < ActiveRecord::Migration[7.0]
  def change
    create_table :teams do |t|
      t.string 'name', null: false
      t.string 'score_team_id'
      t.integer 'starting_slot', null: false
      t.timestamps
    end

    add_index :teams, :name, unique: true
    add_index :teams, :score_team_id, unique: true
    add_index :teams, :starting_slot, unique: true
  end
end
