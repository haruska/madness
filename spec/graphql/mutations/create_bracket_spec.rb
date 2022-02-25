# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::CreateBracket do
  subject { described_class }

  let(:mutation) do
    <<~GRAPHQL
      mutation ($name: String!, $tieBreaker: Int!, $gameDecisions: BigInt!) {
        createBracket(
          input: {name: $name, gameDecisions: $gameDecisions, tieBreaker: $tieBreaker}
        ) {
          bracket {
            id
            name
            tieBreaker
            paid
            gameDecisions
          }
          errors {
            path
            message
          }
        }
      }
    GRAPHQL
  end

  let(:new_attrs) { build(:bracket, :completed) }

  let(:variables) do
    {
      name: new_attrs.name,
      tieBreaker: new_attrs.tie_breaker,
      gameDecisions: new_attrs.game_decisions
    }
  end

  let(:user) { create(:user) }

  let(:schema) { MadnessSchema }
  let(:context) { { current_user: user } }

  let(:result_exe) { schema.execute(mutation, context:, variables:) }
  let(:result) { result_exe.dig('data', 'createBracket', 'bracket')&.with_indifferent_access }
  let(:errors) { Array(result_exe.dig('data', 'createBracket', 'errors')).map(&:with_indifferent_access) }

  it 'creates the bracket' do
    expect { result_exe }.to change(Bracket, :count).by(1)

    expect(errors).to be_empty
    %w[name tie_breaker].each do |attr|
      expect(result[attr.camelize(:lower)]).to eq(new_attrs.public_send(attr))
    end

    expect(result[:gameDecisions]).to eq(new_attrs.game_decisions.to_s)
    expect(result[:paid]).to eq(false)
  end

  context 'with validation errors' do
    before { create(:bracket, name: new_attrs.name) }

    it 'has the validation errors' do
      expect(errors).to_not be_empty
      expect(errors.first[:path]).to eq(%w[attributes name])
      expect(errors.first[:message]).to eq('has already been taken')
    end

    it 'does not create the bracket' do
      expect(result).to be_nil
    end
  end

  context 'when the bracket cannot be created' do
    before { allow(Tournament).to receive(:field_64).and_return(tournament_started) }

    it 'has a user error' do
      expect(errors).to_not be_empty
      expect(errors.first['message']).to eq('Cannot create a bracket')
    end
  end
end
