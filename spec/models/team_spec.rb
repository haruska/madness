# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Team, type: :model do
  let(:tournament) { tournament_unstarted }

  context do
    subject { tournament.teams.first }
    it { is_expected.to validate_length_of(:name).is_at_most(15) }
  end

  describe '#first_game' do
    let(:game) { tournament.round_for(1).sample }

    it 'returns the first game the team plays' do
      expect(game.team_one.first_game.slot).to eq(game.slot)
      expect(game.team_two.first_game.slot).to eq(game.slot)
    end
  end

  describe '#still_playing? / #eliminated?' do
    let(:game) { tournament.round_for(1).first }

    subject { game.team_one }

    context 'no games are played' do
      it 'is true' do
        expect(subject).to be_still_playing
        expect(subject).to_not be_eliminated
      end
    end

    context 'won the first game' do
      subject { game.first_team }

      before do
        tournament.update_game!(game.slot, 0)
        subject.reload
      end

      it 'is true' do
        expect(subject).to be_still_playing
        expect(subject).to_not be_eliminated
      end

      context 'and won the next game' do
        before { tournament.update_game!(game.parent.slot, 0) }

        it 'is true' do
          expect(subject.reload).to be_still_playing
          expect(subject).to_not be_eliminated
        end
      end

      context 'lost the next game' do
        before do
          tournament.update_game!(game.parent.slot, 1)
          subject.reload
        end

        xit 'is false' do
          expect(subject).to_not be_still_playing
          expect(subject).to be_eliminated
        end
      end

      context 'won the championship' do
        let(:tournament) { tournament_completed }
        subject { tournament.championship.team.reload }

        it 'is true' do
          expect(subject).to_not be_eliminated
          expect(subject).to be_still_playing
        end
      end
    end

    context 'lost the first game' do
      subject { game.first_team }

      before do
        tournament.update_game!(game.slot, 1)
        subject.reload
      end

      it 'is false' do
        expect(subject).to_not be_still_playing
        expect(subject).to be_eliminated
      end
    end
  end
end
