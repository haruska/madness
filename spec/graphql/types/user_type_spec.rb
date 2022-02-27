# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::UserType do
  subject { described_class }

  it_behaves_like 'a BaseNodeObject', :user

  let(:query) do
    <<~GRAPHQL
      query($id: ID!) {
       node(id: $id) {
          id
          ...on User {
            name
            email
            admin
          }
        }
      }
    GRAPHQL
  end

  let(:object) { create(:user) }
  let(:user) { object }
  let(:variables) { { id: schema.id_from_object(object) } }

  let(:schema) { MadnessSchema }
  let(:context) { { current_user: user } }
  let(:result_exe) { schema.execute(query, context:, variables:) }
  let(:result) { result_exe.dig('data', 'node')&.with_indifferent_access }

  it 'has all the attributes' do
    expect(result[:id]).to eq(schema.id_from_object(object))
    expect(result[:name]).to eq(object.name)
    expect(result[:email]).to eq(object.email)
    expect(result[:admin]).to eq(object.admin)
  end

  context 'another user' do
    let(:user) { create(:user) }

    it 'restricts email' do
      expect(result[:name]).to eq(object.name)
      expect(result[:email]).to be_nil
    end
  end
end
