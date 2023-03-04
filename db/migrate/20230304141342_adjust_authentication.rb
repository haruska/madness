# frozen_string_literal: true

class AdjustAuthentication < ActiveRecord::Migration[7.0]
  def self.up
    drop_table 'passwordless_sessions'

    change_table :users, bulk: true do |t|
      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      t.index :reset_password_token, unique: true
    end
  end

  def self.down
    raise ActiveRecord::IrreversibleMigration
  end
end
