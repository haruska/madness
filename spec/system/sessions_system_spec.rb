# frozen_string_literal: true

require 'system_helper'

RSpec.describe 'User Authentication', type: :system do
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

        visit '/'

        expect(page).to have_current_path('/games')
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

    it 'returns to the sign in page' do
      visit '/'

      # FIXME: not finding react menu
      # find('.menu').click
      # click_link 'Sign Out'
      expect(page).to_not have_current_path('/sign_in')
      visit '/sign_out'

      expect(page).to have_current_path('/sign_in')
      expect(page).to have_text('Private pool')
    end
  end
end
