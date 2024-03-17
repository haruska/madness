# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Game, type: :model do
  let(:tournament) { tournament_completed }
  let(:tournament_tree) { tournament.tree }

  describe 'aliased methods' do
    let(:slot) { rand((tournament_tree.size / 2) - 1) + 1 }
    subject { tournament_tree.at(slot) }

    it 'is a BDT node' do
      expect(subject).to be_a(Game)
      expect(subject).to be_a(BinaryDecisionTree::Node)
    end

    it 'has a game_one, game_two, and next_game' do
      expect(subject.game_one).to be_present
      expect(subject.game_two).to be_present
      expect(subject.next_game).to be_present unless slot == 1
    end
  end

  describe '#round_number' do
    it 'is the current round of the game' do
      (1..6).to_a.each do |round_num|
        game = tournament_tree.round_for(round_num).sample
        expect(game.round_number).to eq(round_num)
      end
    end
  end

  describe '#round' do
    it 'is the round of the game' do
      (1..6).to_a.each do |round_num|
        game = tournament_tree.round_for(round_num).sample
        expect(game.round).to be_a(Round)
        expect(game.round.number).to eq(round_num)
        expect(game.round.tournament).to eq(tournament)
      end
    end
  end

  describe '#championship?' do
    context 'championship game' do
      subject { tournament_tree.championship }

      it 'is true' do
        expect(subject).to be_championship
      end
    end

    context 'non-championship game' do
      subject { tournament_tree.round_for(1).sample }

      it 'is false' do
        expect(subject).to_not be_championship
      end
    end
  end

  describe '#next_slot' do
    let(:parent) { tournament_tree.round_for(2).sample }

    context 'championship game' do
      subject { tournament_tree.championship }

      it 'is nil' do
        expect(subject.next_slot).to be_nil
      end
    end

    context "game is parent's left slot" do
      subject { parent.left }

      it 'is 1' do
        expect(subject.next_slot).to eq(1)
      end
    end

    context "game is parent's right slot" do
      subject { parent.right }

      it 'is 2' do
        expect(subject.next_slot).to eq(2)
      end
    end
  end

  describe '#next_game_slot' do
    context 'championship game' do
      subject { tournament_tree.championship }

      it 'is nil' do
        expect(subject.next_game_slot).to be_nil
      end
    end

    context 'non-championship game' do
      subject { tournament_tree.round_for(1).sample }

      it 'is the parent_position' do
        expect(subject.next_game_slot).to eq(subject.parent_position)
      end
    end
  end

  describe '#team_one' do
    context 'a leaf node' do
      subject { tournament_tree.round_for(1).sample }

      it 'is the team with the left_position starting slot' do
        expect(subject.team_one).to eq(Team.by_starting_slot(subject.left_position))
      end
    end

    context 'a non-leaf node' do
      subject { tournament_tree.round_for(2).sample }

      it 'is nil' do
        expect(subject.team_one).to be_nil
      end
    end
  end

  describe '#team_two' do
    context 'a leaf node' do
      subject { tournament_tree.round_for(1).sample }

      it 'is the team with the right_position starting slot' do
        expect(subject.team_two).to eq(Team.by_starting_slot(subject.right_position))
      end
    end

    context 'a non-leaf node' do
      subject { tournament_tree.round_for(2).sample }

      it 'is nil' do
        expect(subject.team_two).to be_nil
      end
    end
  end

  describe '#first_team' do
    context 'a leaf node' do
      subject { tournament_tree.round_for(1).sample }

      it 'is team_one' do
        expect(subject.first_team).to eq(subject.team_one)
      end
    end

    context 'a non-leaf node' do
      subject { tournament_tree.round_for(2).sample }

      it 'is the left team of the current game' do
        expect(subject.first_team).to eq(subject.left.team)
      end
    end
  end

  describe '#second_team' do
    context 'a leaf node' do
      subject { tournament_tree.round_for(1).sample }

      it 'is team_two' do
        expect(subject.second_team).to eq(subject.team_two)
      end
    end

    context 'a non-leaf node' do
      subject { tournament_tree.round_for(3).sample }

      it 'is the right team of the current game' do
        expect(subject.second_team).to eq(subject.right.team)
      end
    end
  end

  describe '#team' do
    subject { tournament_tree.round_for(1).sample }

    it 'is the team with the current starting slot' do
      expect(subject.team).to eq(Team.by_starting_slot(subject.value))
    end

    it 'is aliased to winner' do
      expect(subject.winner).to eq(Team.by_starting_slot(subject.value))
    end
  end

  describe '#loser' do
    subject { tournament_tree.round_for(1).sample }
    let(:loser) { subject.first_team == subject.winner ? subject.second_team : subject.first_team }

    it 'is the losing team' do
      expect(subject.loser).to eq(loser)
    end
  end
end
