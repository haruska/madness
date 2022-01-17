class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name, null: false, index: true
      t.string :email, null: false, index: true
      t.boolean :admin, null: false, default: false, index: true
      t.timestamps
    end
  end
end
