# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TournamentPolicy, type: :policy do
  let(:admin) { User.find_by(admin: true) }
  let(:user) { create(:user) }
  let(:resource_type) { Tournament }
  let(:resources) { resource_type.all }

  subject { described_class }

  permissions '.scope' do
    let(:scope) { subject::Scope.new(user, resource_type) }

    it 'is all resources' do
      expect(scope.resolve).to match_array(resources)
    end
  end

  permissions :show? do
    it 'grants access to all users' do
      expect(subject).to permit(user, resources.sample)
    end
  end

  permissions :index? do
    it 'grants access to all users' do
      expect(subject).to permit(user, resource_type)
    end
  end

  permissions :create?, :update?, :destroy? do
    it 'grants access to admins only' do
      expect(subject).to permit(admin, resource_type)
      expect(subject).not_to permit(user, resource_type)
    end
  end
end
