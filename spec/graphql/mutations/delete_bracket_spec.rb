# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::DeleteBracket do
  subject { described_class }

  let(:mutation) do
    <<~GRAPHQL
      mutation ($bracketId: ID!) {
        deleteBracket(
          input: {bracketId: $bracketId}
        ) {
          errors {
            path
            message
          }
        }
      }
    GRAPHQL
  end

  let!(:bracket) { create(:bracket) }

  let(:variables) do
    {
      bracketId: schema.id_from_object(bracket)
    }
  end

  let(:schema) { MadnessSchema }
  let(:context) { { current_user: bracket.user } }

  let(:result_exe) { schema.execute(mutation, context:, variables:) }
  let(:errors) { Array(result_exe.dig('data', 'deleteBracket', 'errors')).map(&:with_indifferent_access) }

  it 'deletes the bracket' do
    expect(errors).to be_empty
    expect { bracket.reload }.to raise_error(ActiveRecord::RecordNotFound)
  end

  context 'when the bracket cannot be deleted' do
    before { bracket.update(paid: true) }

    it 'has a user error' do
      expect(errors).to_not be_empty
      expect(errors.first['message']).to eq('Cannot delete bracket')
    end
  end
end
