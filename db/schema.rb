# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_04_191548) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "brackets", force: :cascade do |t|
    t.bigint "user_id"
    t.string "name", null: false
    t.decimal "game_decisions", precision: 20, default: "0", null: false
    t.boolean "paid", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "best_possible_finish", default: 1, null: false
    t.index ["best_possible_finish"], name: "index_brackets_on_best_possible_finish"
    t.index ["name"], name: "index_brackets_on_name", unique: true
    t.index ["paid"], name: "index_brackets_on_paid"
    t.index ["user_id"], name: "index_brackets_on_user_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name", null: false
    t.string "score_team_id"
    t.integer "starting_slot", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["score_team_id"], name: "index_teams_on_score_team_id"
    t.index ["starting_slot"], name: "index_teams_on_starting_slot", unique: true
  end

  create_table "tournaments", force: :cascade do |t|
    t.datetime "tip_off"
    t.integer "num_rounds", default: 6, null: false
    t.decimal "game_decisions", precision: 20, default: "0", null: false
    t.decimal "game_mask", precision: 20, default: "0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["num_rounds"], name: "index_tournaments_on_num_rounds"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.boolean "admin", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "remember_token"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at", precision: nil
    t.index ["admin"], name: "index_users_on_admin"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name"], name: "index_users_on_name"
    t.index ["remember_token"], name: "index_users_on_remember_token"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
