# frozen_string_literal: true

class CreateTeams < ActiveRecord::Migration[7.0]
  def change
    create_table :teams do |t|
      t.references :tournament
      t.string 'name', null: false
      t.integer 'seed', null: false
      t.string 'score_team_id'
      t.string 'region', null: false
      t.integer 'starting_slot'
      t.index 'region'
      t.index 'score_team_id'
      t.index %w[seed tournament_id region], unique: true
      t.index 'starting_slot'
      t.timestamps
    end
  end
end
