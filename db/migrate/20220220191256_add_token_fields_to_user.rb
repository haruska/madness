# frozen_string_literal: true

class AddTokenFieldsToUser < ActiveRecord::Migration[7.0]
  def change
    change_table :users, bulk: true do |t|
      t.string :login_token, null: true
      t.datetime :login_token_valid_until, null: true
      t.index :login_token, unique: true
    end
  end
end
