# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PagesController, type: :request do
  describe 'GET #rules' do
    before do
      sign_in create(:user)
      get rules_path
    end

    it 'responds successfully with an HTTP 200 status code' do
      expect(response).to have_http_status(:ok)
    end
  end
end
