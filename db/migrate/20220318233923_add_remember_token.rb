# frozen_string_literal: true

class AddRememberToken < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :remember_token, :string
    add_index :users, :remember_token
  end
end
