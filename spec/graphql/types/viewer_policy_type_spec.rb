# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::ViewerPolicyType do
  subject { described_class }

  let(:policy_attributes) { %w[createBracket] }

  let(:query) do
    <<-GRAPHQL
      query($nodeId: ID!) {
        node(id: $nodeId) {
          id
          ...on Viewer {
            policy {
              #{policy_attributes.join("\n")}
            }
          }
        }
      }
    GRAPHQL
  end

  let(:current_user) { create(:user) }

  let(:schema) { MadnessSchema }
  let(:context) { { current_user: } }
  let(:node_id) { schema.id_from_object(Viewer.new) }
  let(:variables) { { nodeId: node_id } }
  let(:result) { schema.execute(query, variables:, context:) }
  let(:result_node) { result.dig('data', 'node')&.with_indifferent_access }

  it 'has a policy' do
    expect(result_node[:id]).to eq(node_id)
    expect(result_node[:policy]).to be_present
  end

  it 'evaluates the different object types' do
    policy_attributes.each do |policy_attribute|
      expect(result_node[:policy][policy_attribute]).to eq(true)
    end
  end
end
