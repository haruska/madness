# frozen_string_literal: true

class CreateTournamentResults < ActiveRecord::Migration[7.0]
  def change
    create_table :tournament_results do |t|
      t.decimal 'game_decisions', precision: 20, default: '0', null: false
      t.decimal 'game_mask', precision: 20, default: '0', null: false
      t.timestamps
      t.index '(true)', name: 'idx_single_row_tourn_result', unique: true
    end
  end
end
