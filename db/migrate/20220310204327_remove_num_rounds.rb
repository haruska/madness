# frozen_string_literal: true

class RemoveNumRounds < ActiveRecord::Migration[7.0]
  def up
    remove_column :tournaments, :num_rounds
  end
end
