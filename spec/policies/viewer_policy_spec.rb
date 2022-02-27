# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ViewerPolicy, type: :policy do
  let(:user) { create(:user) }
  let(:admin) { User.find_by(admin: true) }

  let(:object) { Viewer.new }

  subject { described_class }

  permissions :show? do
    it 'grants access to everyone' do
      expect(subject).to permit(user, object)
    end
  end

  permissions :create?, :update?, :destroy? do
    it 'denies access to everyone' do
      expect(subject).to_not permit(admin, object)
      expect(subject).to_not permit(user, object)
    end
  end
end
