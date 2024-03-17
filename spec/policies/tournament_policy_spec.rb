# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TournamentPolicy, type: :policy do
  let(:admin) { User.find_by(admin: true) }
  let(:user) { create(:user) }
  let(:resource_type) { Tournament }
  let(:resource) { resource_type.new }

  subject { described_class }

  permissions :show? do
    it 'grants access to all users' do
      expect(subject).to permit(user, resource)
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
