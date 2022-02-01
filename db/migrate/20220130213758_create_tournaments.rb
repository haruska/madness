# frozen_string_literal: true

class CreateTournaments < ActiveRecord::Migration[7.0]
  def change
    create_table :tournaments do |t|
      t.datetime 'tip_off'
      t.decimal 'game_decisions', precision: 20, default: '0', null: false
      t.decimal 'game_mask', precision: 20, default: '0', null: false
      t.timestamps
    end
  end
end
