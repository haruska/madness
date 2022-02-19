# frozen_string_literal: true

require 'system_helper'

RSpec.describe 'User management', type: :system do
  describe 'authenticating' do
    context 'with a known email' do
      let!(:admin) { create(:user, admin: true) }
      let(:user) { create(:user) }
      let!(:another_user) { create(:user) }

      it 'lets a user know the email has been sent' do
        visit '/'

        fill_in 'passwordless[email]', with: user.email
        click_button 'Send Link'

        expect(page).to have_text('User found, check your inbox')
      end

      it 'authenticates on a magic link' do
        passwordless_sign_in(user)

        visit users_path

        expect(page).to have_current_path(users_path)
        expect(page).to have_link(admin.name)
        expect(page).to have_link(user.name)

        expect(page).to have_text(another_user.name)
        expect(page).to_not have_link(another_user.name)

        click_link(user.name)

        expect(page).to have_current_path(user_path(user))
        expect(page).to have_text(user.name)
        expect(page).to have_text(user.email)
      end
    end

    context 'with an unknown email' do
      it 'lets a user know the email is not found' do
        visit '/'

        fill_in 'passwordless[email]', with: Faker::Internet.email
        click_button 'Send Link'

        expect(page).to have_text('No user found with the provided email address')
      end
    end
  end

  describe 'signing out' do
    before do
      passwordless_sign_in(create(:user))
    end

    it 'returns to the signin page' do
      visit users_path

      click_link 'Sign Out'

      expect(page).to have_current_path('/sign_in')
      expect(page).to have_text('Sign In')
    end
  end

  describe 'destroying a user' do
    let!(:user) { create(:user) }

    before do
      passwordless_sign_in(create(:user, admin: true))
    end

    xit 'confirms before destroying' do
      visit user_path(user)

      expect(page).to have_button('Destroy')

      dismiss_confirm { click_button 'Destroy' }
      expect(user.reload).to be_present

      accept_confirm { click_button 'Destroy' }
      expect { user.reload }.to raise_error(ActiveRecord::RecordNotFound)
      expect(page).to have_current_path(users_path)
      expect(page).to have_text('User was successfully destroyed.')
    end
  end
end
