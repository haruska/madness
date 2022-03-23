# frozen_string_literal: true

class AddBestFinish < ActiveRecord::Migration[7.0]
  def change
    add_column :brackets, :best_possible_finish, :integer, default: 1, null: false
    add_index :brackets, :best_possible_finish
  end
end
