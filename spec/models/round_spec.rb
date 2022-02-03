# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Round do
  let(:tournament) { Tournament.field64 }

  subject { Round.all.first }

  describe 'regions' do
    context 'earlier rounds' do
      let(:rounds) { Round.all[0...4] }

      it 'is the four regions' do
        rounds.each do |round|
          expect(round.regions).to eq(Team::REGIONS)
        end
      end
    end

    context 'last two rounds' do
      let(:rounds) { Round.all.last(2) }

      it 'is nil' do
        rounds.each do |round|
          expect(round.regions).to be_nil
        end
      end
    end
  end

  describe 'name' do
    subject { Round.all.first }

    it 'has the earlier round names' do
      expect(subject.name).to eq(Round::NAMES.first)
    end
  end

  describe 'start_date' do
    let(:expected_days) { [0, 2, 7, 9, 16, 18] }

    it 'is the correct dates for all six rounds' do
      expected_days.each_with_index do |extra_days, i|
        round = Round.new(i + 1)
        expect(round.start_date).to eq(tournament.tip_off.to_date + extra_days.days)
      end
    end
  end

  describe 'end_date' do
    context 'first rounds' do
      let(:round_numbers) { (1..4).to_a }

      it 'is a day after the start_date' do
        round_numbers.each do |number|
          round = Round.new(number)
          expect(round.end_date).to eq(round.start_date + 1.day)
        end
      end
    end

    context 'last two rounds' do
      let(:round_numbers) { [5, 6] }

      it 'is the start_date' do
        round_numbers.each do |number|
          round = Round.new(number)
          expect(round.end_date).to eq(round.start_date)
        end
      end
    end
  end
end
