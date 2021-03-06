# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserPolicy, type: :policy do
  let(:admin) { User.find_by(admin: true) }
  let(:users) { create_list(:user, 3) }
  let!(:all_users) { [admin] + users }

  subject { described_class }

  permissions '.scope' do
    let(:scope) { subject::Scope.new(user, User) }
    let(:user) { users.first }

    it 'is all users' do
      expect(scope.resolve).to match_array(all_users)
    end
  end

  permissions :show? do
    it 'grants access to everyone' do
      expect(subject).to permit(users.first, users.second)
      expect(subject).to permit(admin, users.last)
    end
  end

  permissions :show_email? do
    it 'denies access if not an admin and not viewing yourself' do
      expect(subject).not_to permit(users.first, users.second)
    end

    it 'grants access if user is yourself' do
      expect(subject).to permit(users.first, users.first)
      expect(subject).to permit(admin, admin)
    end

    it 'grants access to view admin by anyone' do
      expect(subject).to permit(users.first, admin)
    end

    it 'grants access to admin to view anyone' do
      expect(subject).to permit(users.first, admin)
    end
  end

  permissions :create?, :update?, :destroy? do
    it 'grants access to admins only' do
      expect(subject).to permit(admin, User)
      expect(subject).not_to permit(users.first, User)
    end
  end

  permissions :destroy? do
    it 'does not allow you to destroy yourself' do
      expect(subject).not_to permit(admin, admin)
    end
  end
end
