# frozen_string_literal: true

class DropTournaments < ActiveRecord::Migration[7.0]
  def up
    drop_table :tournaments
  end

  def down
    create_table :tournaments do |t|
      t.datetime 'tip_off'
      t.integer 'num_rounds', default: 6, null: false
      t.decimal 'game_decisions', precision: 20, default: '0', null: false
      t.decimal 'game_mask', precision: 20, default: '0', null: false
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
      t.index ['num_rounds'], name: 'index_tournaments_on_num_rounds'
    end
  end
end
