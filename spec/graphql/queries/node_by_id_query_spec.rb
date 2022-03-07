# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Querying a node by id' do
  subject { described_class }

  let(:query) do
    <<~GRAPHQL
      query($id: ID!) {
        node(id: $id) {
          id
          ...on Bracket {
              name
              gameDecisions
          }
        }
      }
    GRAPHQL
  end

  let(:user) { bracket.user }
  let(:bracket) { create(:bracket) }
  let(:variables) do
    {
      id: schema.id_from_object(bracket)
    }
  end

  let(:schema) { MadnessSchema }
  let(:context) { { current_user: user } }
  let(:result_exe) { schema.execute(query, context:, variables:) }
  let(:result) { result_exe.dig('data', 'node')&.with_indifferent_access }
  let(:errors) { Array(result_exe['errors']).map(&:with_indifferent_access) }

  it 'is the bracket node' do
    expect(result[:id]).to eq(schema.id_from_object(bracket))
    expect(result[:name]).to eq(bracket.name)
  end

  context 'with an unviewable bracket' do
    let(:user) { create(:user) }

    it 'is an error' do
      expect(errors).to_not be_empty
      expect(errors.first[:message]).to start_with('Not authorized:')
      expect(result).to be_nil
    end
  end
end
