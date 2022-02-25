# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::BracketType do
  subject { described_class }

  it_behaves_like 'a BaseNodeObject', :bracket

  let(:query) do
    <<~GRAPHQL
      query($id: ID!) {
       node(id: $id) {
          id
          ...on Bracket {
            name
            gameDecisions
            tieBreaker
            paid
            user {
              id
            }
          }
        }
      }
    GRAPHQL
  end

  let(:user) { bracket.user }
  let(:bracket) { create(:bracket, :completed) }
  let(:variables) { { id: schema.id_from_object(bracket) } }

  let(:schema) { MadnessSchema }
  let(:context) { { current_user: user } }
  let(:result_exe) { schema.execute(query, context:, variables:) }
  let(:result) { result_exe.dig('data', 'node')&.with_indifferent_access }

  it 'has all the attributes' do
    expect(result[:id]).to eq(schema.id_from_object(bracket))
    expect(result[:name]).to eq(bracket.name)
    expect(result[:gameDecisions]).to eq(bracket.game_decisions.to_s)
    expect(result[:tieBreaker]).to eq(bracket.tie_breaker)
    expect(result[:paid]).to eq(bracket.paid)
  end
end
