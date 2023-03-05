# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Ups', type: :request do
  describe 'health check' do
    it 'should be successful' do
      get up_url
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'database health check' do
    it 'should be successful' do
      get up_databases_url
      expect(response).to have_http_status(:ok)
    end
  end
end
