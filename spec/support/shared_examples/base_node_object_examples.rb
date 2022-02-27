# frozen_string_literal: true

RSpec.shared_examples 'a BaseNodeObject' do |object_symbol|
  let(:query) do
    <<-GRAPHQL
      query($nodeId: ID!) {
        node(id: $nodeId) {
          id
          ...on HasPolicy {
            policy {
              show
              update
              destroy
            }
          }
        }
      }
    GRAPHQL
  end

  let(:object) do
    case object_symbol
    when :tournament
      Tournament.field_64
    when :viewer
      Viewer.new
    else
      create(object_symbol)
    end
  end

  let(:current_user) do
    case object
    when Bracket
      object.user
    else
      create(:user)
    end
  end

  let(:schema) { MadnessSchema }
  let(:context) { { current_user: } }
  let(:node_id) { schema.id_from_object(object) }
  let(:variables) { { nodeId: node_id } }
  let(:result) { schema.execute(query, variables:, context:) }
  let(:result_node) { result.dig('data', 'node')&.with_indifferent_access }

  it 'has a policy' do
    expect(result_node[:id]).to eq(node_id)
    expect(result_node[:policy]).to be_present
  end
end
