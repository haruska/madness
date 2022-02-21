# frozen_string_literal: true

class CreateBrackets < ActiveRecord::Migration[7.0]
  def change
    create_table :brackets do |t|
      t.references :user
      t.string 'name', null: false, index: { unique: true }
      t.decimal 'tree_decisions', precision: 20, default: '0', null: false
      t.integer 'tie_breaker', default: '0', null: false
      t.boolean 'paid', default: false, null: false, index: true
      t.timestamps
    end
  end
end
