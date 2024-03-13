# frozen_string_literal: true

require 'csv'

ActiveSupport::Reloader.to_prepare do
  # rubocop:disable Lint/ConstantDefinitionInBlock
  TEAMS = CSV.read(Rails.root.join('data/teams.csv').to_s).map.with_index(64) do |(name, score_team_id), starting_slot|
    Team.new(starting_slot:, name:, score_team_id:)
  end
  # rubocop:enable Lint/ConstantDefinitionInBlock
end
