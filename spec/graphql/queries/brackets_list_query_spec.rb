# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Querying for brackets' do
  let(:query) do
    <<~GRAPHQL
      query($onlyUser: Boolean) {
        viewer {
          brackets(onlyUser: $onlyUser) {
            id
            name
            gameDecisions
            tieBreaker
            paid
            user {
              id
              name
              email
            }
          }
        }
      }
    GRAPHQL
  end

  let(:brackets) { create_list(:bracket, 5) }
  let(:user) { brackets.first.user }
  let(:only_user) { false }

  let(:schema) { MadnessSchema }
  let(:context) { { current_user: user } }
  let(:variables) { { onlyUser: only_user } }
  let(:result_exe) { schema.execute(query, context:, variables:) }
  let(:result) { result_exe.dig('data', 'viewer', 'brackets').map(&:with_indifferent_access) }

  context 'when the tournament has started' do
    let(:tournament) { tournament_started }

    before do
      allow(Tournament).to receive(:field_64).and_return(tournament)
    end

    context 'requesting only current user brackets' do
      let(:only_user) { true }

      it 'is only the current user brackets' do
        brackets = result.pluck(:id).map { |id| schema.object_from_id(id) }
        expect(brackets).to match_array(user.brackets)
      end
    end

    context 'requesting all brackets' do
      let(:only_user) { false }

      it 'is all the brackets' do
        brackets = result.pluck(:id).map { |id| schema.object_from_id(id) }
        expect(brackets).to match_array(Bracket.all)
      end
    end
  end

  context 'when the tournament has not started' do
    before do
      expect(Tournament.field_64).to_not be_started
    end

    context 'requesting only current user brackets' do
      let(:only_user) { true }

      it 'is only the current user brackets' do
        brackets = result.pluck(:id).map { |id| schema.object_from_id(id) }
        expect(brackets).to match_array(user.brackets)
      end
    end

    context 'requesting all brackets' do
      let(:only_user) { false }

      context 'as a regular user' do
        it 'is still just the users brackets' do
          brackets = result.pluck(:id).map { |id| schema.object_from_id(id) }
          expect(brackets).to match_array(user.brackets)
        end
      end

      context 'as an admin user' do
        let(:user) { User.find_by(admin: true) }

        it 'is all the brackets' do
          brackets = result.pluck(:id).map { |id| schema.object_from_id(id) }
          expect(brackets).to match_array(Bracket.all)
        end
      end
    end
  end
end
