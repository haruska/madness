# frozen_string_literal: true

require 'system_helper'

RSpec.describe 'User management', type: :system do
  describe 'authenticating' do
    context 'with a known email' do
      let(:user) { create(:user) }

      it 'lets a user know the email has been sent' do
        visit '/'

        fill_in 'passwordless[email]', with: user.email
        click_button 'Send Link'

        expect(page).to have_text('User found, check your inbox')
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
end
