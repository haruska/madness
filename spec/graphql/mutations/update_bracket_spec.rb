# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::UpdateBracket do
  subject { described_class }

  let(:mutation) do
    <<~GRAPHQL
      mutation ($bracketId: ID!, $name: String, $tieBreaker: Int, $gameDecisions: BigInt) {
        updateBracket(
          input: {bracketId: $bracketId, name: $name, gameDecisions: $gameDecisions, tieBreaker: $tieBreaker}
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

  let!(:bracket) { create(:bracket, :completed) }
  let(:new_attrs) { build(:bracket, :completed) }

  let(:variables) do
    {
      bracketId: schema.id_from_object(bracket),
      name: new_attrs.name,
      tieBreaker: new_attrs.tie_breaker,
      gameDecisions: new_attrs.game_decisions
    }
  end

  let(:schema) { MadnessSchema }
  let(:context) { { current_user: bracket.user } }

  let(:result_exe) { schema.execute(mutation, context:, variables:) }
  let(:result) { result_exe.dig('data', 'updateBracket', 'bracket')&.with_indifferent_access }
  let(:errors) { Array(result_exe.dig('data', 'updateBracket', 'errors')).map(&:with_indifferent_access) }

  it 'updates the attributes' do
    expect(errors).to be_empty
    %w[name tie_breaker].each do |attr|
      expect(result[attr.camelize(:lower)]).to eq(new_attrs.public_send(attr))
    end

    expect(result[:id]).to eq(schema.id_from_object(bracket))
    expect(result[:gameDecisions]).to eq(new_attrs.game_decisions.to_s)
  end

  context 'with validation errors' do
    before { create(:bracket, name: new_attrs.name) }

    it 'has the validation errors' do
      expect(errors).to_not be_empty
      expect(errors.first[:path]).to eq(%w[name])
      expect(errors.first[:message]).to eq('has already been taken')
    end

    it 'does not update the bracket' do
      expect(result).to be_nil
    end
  end

  context 'when the bracket cannot be updated' do
    before { allow(Tournament).to receive(:field_64).and_return(tournament_started) }

    it 'has a user error' do
      expect(errors).to_not be_empty
      expect(errors.first['message']).to eq('Cannot update bracket')
    end
  end
end
