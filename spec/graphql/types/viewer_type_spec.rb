# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::ViewerType do
  subject { described_class }

  it_behaves_like 'a BaseNodeObject', :viewer

  let(:query) do
    <<~GRAPHQL
      query {
        viewer {
          id
          currentUser {
            name
            email
            admin
          }
        }
      }
    GRAPHQL
  end

  let(:user) { create(:user) }

  let(:schema) { MadnessSchema }
  let(:context) { { current_user: user } }
  let(:exe_result) { schema.execute(query, context:) }
  let(:result) { exe_result.dig('data', 'viewer')&.with_indifferent_access }

  it 'has current user fields' do
    expect(result[:currentUser][:name]).to eq(user.name)
    expect(result[:currentUser][:email]).to eq(user.email)
    expect(result[:currentUser][:admin]).to be(false)
  end
end
