# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BinaryDecisionTree::Tree do
  subject { described_class }

  describe 'creating a new tree' do
    it 'should allow an optional node class' do
      expect(subject.new(1).root.class).to eq(BinaryDecisionTree::Node)
      expect(subject.new(1, node_class: SubNode).root.class).to eq(SubNode)
    end
  end
end

class SubNode < BinaryDecisionTree::Node; end
