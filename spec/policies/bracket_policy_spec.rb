# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BracketPolicy, type: :policy do
  let(:admin) { User.find_by(admin: true) }
  let(:user) { resources.first&.user }
  let(:resource_type) { Bracket }
  let!(:resources) { create_list(:bracket, 3) }

  subject { described_class }

  permissions '.scope' do
    let(:scope) { subject::Scope.new(user, resource_type) }

    context 'tournament has not started' do
      before do
        expect(Tournament.field_64).to_not be_started
      end

      it 'is the user resources' do
        expect(scope.resolve).to match_array(user.brackets)
      end
    end

    context 'and tournament has started' do
      before do
        tournament = tournament_started
        expect(Tournament).to receive(:field_64).and_return(tournament)
      end

      it 'is all resources' do
        expect(scope.resolve).to match_array(resources)
      end
    end
  end

  permissions :show? do
    context 'tournament has started' do
      before do
        tournament = tournament_started
        expect(Tournament).to receive(:field_64).and_return(tournament)
      end

      it 'grants access to all users' do
        expect(subject).to permit(user, resources.sample)
      end
    end

    context 'tournament has not started' do
      before do
        expect(Tournament.field_64).to_not be_started
      end

      context 'and user is admin' do
        it 'grants access' do
          resources.each { |r| expect(subject).to permit(admin, r) }
        end
      end

      context 'and a regular user' do
        it 'allows access to own brackets' do
          expect(subject).to permit(user, user.brackets.first)
        end

        it 'denies access to others brackets' do
          expect(subject).to_not permit(user, resources.find { |r| r.user != user })
        end
      end
    end
  end

  permissions :create? do
    context 'tournament has started' do
      before do
        tournament = tournament_started
        expect(Tournament).to receive(:field_64).at_least(1).and_return(tournament)
      end

      it 'denys all users' do
        expect(subject).not_to permit(user, resource_type)
        expect(subject).not_to permit(admin, resource_type)
      end
    end

    context 'tournament has not started' do
      before do
        expect(Tournament.field_64).to_not be_started
      end

      it 'allows all users' do
        expect(subject).to permit(user, resource_type)
        expect(subject).to permit(admin, resource_type)
      end
    end
  end

  permissions :update? do
    it 'grants access to admin' do
      resources.each { |r| expect(subject).to permit(admin, r) }
    end

    context 'tournament has started' do
      before do
        tournament = tournament_started
        expect(Tournament).to receive(:field_64).at_least(1).and_return(tournament)
      end

      it 'denys all regular users' do
        resources.each { |r| expect(subject).to_not permit(user, r) }
      end
    end

    context 'tournament has not started' do
      before do
        expect(Tournament.field_64).to_not be_started
      end

      it 'allows users own bracket' do
        expect(subject).to permit(user, user.brackets.first)
      end

      it "does not allow non-admins to update other's brackets" do
        expect(subject).to_not permit(user, resources.find { |r| r.user != user })
      end
    end
  end

  permissions :destroy? do
    let(:bracket) { user.brackets.first }

    before do
      expect(bracket).to_not be_paid
    end

    it 'does not allow a user to destroy their paid bracket' do
      expect(subject).to permit(user, bracket)
      bracket.update!(paid: true)
      expect(subject).to_not permit(user, bracket)
    end

    context 'tournament has started' do
      before do
        tournament = tournament_started
        allow(Tournament).to receive(:field_64).and_return(tournament)
      end

      it 'allows all regular users on their unpaid brackets' do
        resources.each { |r| expect(subject).to permit(r.user, r) }
      end
    end

    context 'tournament has not started' do
      before do
        expect(Tournament.field_64).to_not be_started
      end

      it 'allows users own bracket' do
        expect(subject).to permit(user, user.brackets.first)
      end

      it 'does not allow non-admins to destroy others brackets' do
        expect(subject).to_not permit(user, resources.find { |r| r.user != user })
      end
    end
  end
end
