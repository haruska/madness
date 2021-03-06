# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::TournamentType do
  subject { described_class }

  let(:query) do
    <<~GRAPHQL
      {
        viewer {
          id
          tournament64 {
            id
            gameDecisions
            gameMask
            gamesRemaining
            tipOff
            started
            rounds {
              id
              name
              number
              regions
              startDate
              endDate
            }
            teams {
              id
              name
              seed
              startingSlot
            }
          }
        }
      }
    GRAPHQL
  end

  let(:user) { create(:user) }
  let(:tournament) { tournament_completed }

  let(:schema) { MadnessSchema }
  let(:context) { { current_user: user } }
  let(:result_exe) { schema.execute(query, context:) }
  let(:result) { result_exe.dig('data', 'viewer', 'tournament64')&.with_indifferent_access }

  before do
    expect(Tournament).to receive(:field_64).and_return(tournament)
  end

  describe 'tip_off' do
    it 'is the string representation of the tip_off Time (iso8601)' do
      expect(result[:tipOff]).to eq(tournament.tip_off.iso8601)
      expect(Time.iso8601(result[:tipOff])).to eq(tournament.tip_off)
    end
  end

  describe 'teams' do
    it 'is a list of all teams in the tournament' do
      expected_ids = tournament.teams.map { |team| schema.id_from_object(team) }
      actual_ids = result[:teams].pluck(:id)

      expect(actual_ids).to match_array(expected_ids)
    end
  end

  describe 'game_decisions' do
    it 'is a big int' do
      expect(result[:gameDecisions]).to eq(tournament.game_decisions.to_s)
    end
  end

  describe 'game_mask' do
    it 'is a big int' do
      expect(result[:gameMask]).to eq(tournament.game_mask.to_s)
    end
  end
end
