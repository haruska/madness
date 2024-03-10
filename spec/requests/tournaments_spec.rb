# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TournamentsController, type: :request do
  let(:user) { create(:user) }
  let(:admin) { create(:user, admin: true) }
  let(:tournament) { Tournament.field_64 }

  before do
    allow(Tournament).to receive(:field_64).and_return(tournament)
  end

  describe 'GET #show' do
    it 'responds successfully with an HTTP 200 status code' do
      sign_in user
      get tournament_path
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'GET #edit' do
    context 'as an admin' do
      it 'responds successfully with an HTTP 200 status code' do
        sign_in admin
        get edit_tournament_path
        expect(response).to have_http_status(:ok)
      end
    end

    context 'as a non-admin user' do
      it 'is not authorized' do
        sign_in user
        expect { get edit_tournament_path }.to raise_error(Pundit::NotAuthorizedError)
      end
    end
  end

  describe 'PATCH/PUT #update' do
    let(:valid_attributes) { { game_decisions: 'new decisions', game_mask: 'new mask' } }

    context 'as an admin' do
      before do
        sign_in admin
      end

      it 'updates the tournament and redirects to the tournament page' do
        patch tournament_path, params: { tournament: valid_attributes }
        expect(response).to redirect_to(tournament_path)
      end
    end

    context 'as a non-admin user' do
      it 'is not authorized to update the tournament' do
        sign_in user
        expect do
          patch tournament_path, params: { tournament: valid_attributes }
        end.to raise_error(Pundit::NotAuthorizedError)
      end
    end
  end
end
