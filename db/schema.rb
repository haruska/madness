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

ActiveRecord::Schema[7.0].define(version: 2022_02_21_144145) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "brackets", force: :cascade do |t|
    t.bigint "user_id"
    t.string "name", null: false
    t.decimal "game_decisions", precision: 20, default: "0", null: false
    t.integer "tie_breaker", default: 0, null: false
    t.boolean "paid", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_brackets_on_name", unique: true
    t.index ["paid"], name: "index_brackets_on_paid"
    t.index ["user_id"], name: "index_brackets_on_user_id"
  end

  create_table "passwordless_sessions", force: :cascade do |t|
    t.string "authenticatable_type"
    t.bigint "authenticatable_id"
    t.datetime "timeout_at", null: false
    t.datetime "expires_at", null: false
    t.datetime "claimed_at"
    t.text "user_agent", null: false
    t.string "remote_addr", null: false
    t.string "token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["authenticatable_type", "authenticatable_id"], name: "authenticatable"
  end

  create_table "teams", force: :cascade do |t|
    t.bigint "tournament_id"
    t.string "name", null: false
    t.integer "seed", null: false
    t.string "score_team_id"
    t.string "region", null: false
    t.integer "starting_slot"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["region"], name: "index_teams_on_region"
    t.index ["score_team_id"], name: "index_teams_on_score_team_id"
    t.index ["seed", "tournament_id", "region"], name: "index_teams_on_seed_and_tournament_id_and_region", unique: true
    t.index ["starting_slot"], name: "index_teams_on_starting_slot"
    t.index ["tournament_id"], name: "index_teams_on_tournament_id"
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
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "login_token"
    t.datetime "login_token_valid_until", precision: nil
    t.index ["admin"], name: "index_users_on_admin"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["login_token"], name: "index_users_on_login_token", unique: true
    t.index ["name"], name: "index_users_on_name"
  end

end
