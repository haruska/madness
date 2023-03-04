# frozen_string_literal: true

class RemoveUnusedDeviseColumns < ActiveRecord::Migration[7.0]
  def self.up
    change_table :users, bulk: true do |t|
      t.remove :confirmation_token
      t.remove :confirmed_at
      t.remove :confirmation_sent_at
      t.remove :unconfirmed_email
      t.remove :login_token
      t.remove :login_token_valid_until
    end
  end

  def self.down
    raise ActiveRecord::IrreversibleMigration
  end
end
