# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Round do
  let(:tournament) { Tournament.field_64 }

  subject { tournament.rounds.sample }

  describe 'validations' do
    it { is_expected.to validate_presence_of(:tournament) }
    it { is_expected.to validate_presence_of(:number) }
  end

  describe 'regions' do
    context 'earlier rounds' do
      let(:rounds) { tournament.rounds[0...-2] }

      it 'is the four regions' do
        rounds.each do |round|
          expect(round.regions).to eq(Team::REGIONS)
        end
      end
    end

    context 'last two rounds' do
      let(:rounds) { tournament.rounds[-2..] }

      it 'is nil' do
        rounds.each do |round|
          expect(round.regions).to be_nil
        end
      end
    end
  end

  describe 'name' do
    subject { tournament.rounds.first }

    context 'full tournament' do
      it 'has the earlier round names' do
        expect(subject.name).to eq(Round::NAMES.first)
      end
    end

    xcontext 'sweet 16 tournament' do
      let(:tournament) { create(:tournament, :sweet_16) }

      it 'has the later round names' do
        expect(subject.name).to eq(Round::NAMES.third)
      end
    end
  end

  describe 'start_date' do
    context 'full tournament' do
      let(:expected_days) { [0, 2, 7, 9, 16, 18] }

      it 'is the correct dates for all six rounds' do
        expected_days.each_with_index do |extra_days, i|
          round = tournament.rounds[i]
          expect(round.start_date).to eq(tournament.tip_off.to_date + 1.day + extra_days.days)
        end
      end
    end

    xcontext 'sweet 16' do
      let(:tournament) { create(:tournament, :sweet_16) }
      let(:expected_days) { [0, 2, 9, 11] }

      it 'is the correct dates for all four rounds' do
        expected_days.each_with_index do |extra_days, i|
          round_number = i + 1
          subject.number = round_number
          expect(subject.start_date).to eq(tournament.tip_off.to_date + extra_days.days)
        end
      end
    end
  end

  describe 'end_date' do
    context 'full tournament' do
      context 'first rounds' do
        let(:rounds) { tournament.rounds[0..3] }

        it 'is a day after the start_date' do
          rounds.each do |round|
            expect(round.end_date).to eq(round.start_date + 1.day)
          end
        end
      end

      context 'last two rounds' do
        let(:rounds) { tournament.rounds[4..] }

        it 'is the start_date' do
          rounds.each do |round|
            expect(round.end_date).to eq(round.start_date)
          end
        end
      end
    end

    xcontext 'sweet 16 tournament' do
      let(:tournament) { create(:tournament, :sweet_16) }

      context 'first rounds' do
        let(:round_numbers) { [1, 2] }

        it 'is a day after the start_date' do
          round_numbers.each do |number|
            subject.number = number
            expect(subject.end_date).to eq(subject.start_date + 1.day)
          end
        end
      end

      context 'last two rounds' do
        let(:round_numbers) { [3, 4] }

        it 'is the start_date' do
          round_numbers.each do |number|
            subject.number = number
            expect(subject.end_date).to eq(subject.start_date)
          end
        end
      end
    end
  end
end
