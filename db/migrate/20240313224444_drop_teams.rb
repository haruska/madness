# frozen_string_literal: true

class DropTeams < ActiveRecord::Migration[7.0]
  def up
    drop_table :teams
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
