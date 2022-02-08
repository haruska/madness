# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TournamentPolicy, type: :policy do
  let(:user) { create(:user) }
  let(:admin) { create(:user, admin: true) }

  let(:tournament) { Tournament.field64 }

  subject { described_class }

  permissions :show? do
    it 'denies access to guest' do
      expect(subject).not_to permit(nil, tournament)
    end

    it 'allows everyone else' do
      expect(subject).to permit(user, tournament)
    end
  end

  permissions :create?, :update?, :destroy? do
    it 'allows only admins' do
      expect(subject).not_to permit(nil, tournament)
      expect(subject).not_to permit(user, tournament)
      expect(subject).to permit(admin, tournament)
    end
  end
end
