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

    it 'displays the title "Rules and Scoring"' do
      expect(response.body).to include('Rules and Scoring')
    end

    it 'displays the correct prize percentages' do
      expect(response.body).to include('1st')
      expect(response.body).to include('50%')
      expect(response.body).to include('2nd')
      expect(response.body).to include('20%')
      expect(response.body).to include('3rd')
      expect(response.body).to include('15%')
      expect(response.body).to include('4th')
      expect(response.body).to include('10%')
      expect(response.body).to include('5th')
      expect(response.body).to include('5%')
    end
  end
end
