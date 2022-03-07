# frozen_string_literal: true

class RemoveTiebreaker < ActiveRecord::Migration[7.0]
  def up
    remove_column :brackets, :tie_breaker
  end
end
