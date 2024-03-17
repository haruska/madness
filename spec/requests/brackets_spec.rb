# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Brackets', type: :request do
  let(:user) { create(:user) }

  before do
    sign_in user
  end

  describe 'GET /index' do
    context 'when the tournament has not started' do
      before do
        tournament_unstarted
      end

      it 'redirects to /my_brackets' do
        get brackets_path
        expect(response).to have_http_status(:redirect)
        expect(response).to redirect_to(my_brackets_path)
      end
    end

    context 'when the tournament has started' do
      before do
        create_list(:bracket, 3, user:)
        t = tournament_started
        allow(Tournament).to receive(:field_64) { t }
      end

      it 'shows brackets with HTTP status 200' do
        get brackets_path
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'GET /my_brackets' do
    context 'when the tournament has started' do
      before do
        t = tournament_started
        allow(Tournament).to receive(:field_64) { t }
      end

      it 'redirects to /brackets' do
        get my_brackets_path
        expect(response).to have_http_status(:redirect)
        expect(response).to redirect_to(brackets_path)
      end
    end

    context 'when the tournament has not started' do
      before do
        tournament_unstarted
        create_list(:bracket, 2, user:)
      end

      it 'shows user brackets with HTTP status 200' do
        get my_brackets_path
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'GET /show' do
    let(:bracket) { create(:bracket, user:) }

    it 'shows a specific bracket with HTTP status 200' do
      get bracket_path(bracket)
      expect(response).to have_http_status(:ok)
    end
  end

  # Assuming 'sign_in user' and other setup as previously defined...

  describe 'GET /new' do
    it 'responds with HTTP status 200' do
      get new_bracket_path
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'GET /edit' do
    let(:bracket) { create(:bracket, user:) }

    it 'responds with HTTP status 200 for an existing bracket' do
      get edit_bracket_path(bracket)
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      let(:valid_attributes) { attributes_for(:bracket) }

      it 'creates a new Bracket and redirects to the bracket path' do
        expect do
          post brackets_path, params: { bracket: valid_attributes }
        end.to change(Bracket, :count).by(1)
        expect(response).to have_http_status(:redirect)
        follow_redirect!
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid parameters' do
      let(:invalid_attributes) { { name: '' } } # Assuming name is required

      it 'does not create a new Bracket and re-renders the new template' do
        expect do
          post brackets_path, params: { bracket: invalid_attributes }
        end.not_to change(Bracket, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH/PUT /update' do
    let(:bracket) { create(:bracket, user:) }
    let(:new_attributes) { { name: 'Updated Bracket Name' } }

    it 'updates the requested bracket and redirects' do
      patch bracket_path(bracket), params: { bracket: new_attributes }
      bracket.reload
      expect(bracket.name).to eq('Updated Bracket Name')
      expect(response).to redirect_to(bracket)
      follow_redirect!
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'DELETE /destroy' do
    let!(:bracket) { create(:bracket, user:) }

    it 'destroys the requested bracket and returns status code 200' do
      expect do
        delete bracket_path(bracket)
      end.to change(Bracket, :count).by(-1)
      expect(response).to have_http_status(:ok)
    end
  end
end
