# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BinaryDecisionTree::MarshalledTree do
  subject { described_class }

  let(:tree) do
    tree = BinaryDecisionTree::Tree.new(6)

    tree.size.times do |i|
      next if i == 0

      tree.at(i).decision = rand(2)
    end

    tree
  end

  let(:marshalled_tree) { subject.from_tree(tree) }

  describe 'marshalling a tree' do
    let(:another_tree) { described_class.new(tree.depth, marshalled_tree.decisions, marshalled_tree.mask).to_tree }

    it 'should marshal and unmarshal to the same tree' do
      expect(marshalled_tree.to_tree).to be_same_tree(tree)
    end

    it 'should be able to unmarshal from numeric values' do
      expect(another_tree).to be_same_tree(tree)
    end
  end

  describe 'using a different tree class' do
    it 'should instantiate the correct object type' do
      expect(marshalled_tree.to_tree.class).to eq(BinaryDecisionTree::Tree)
      expect(marshalled_tree.to_tree(tree_class: SubTree).class).to eq(SubTree)
    end
  end
end

class SubTree < BinaryDecisionTree::Tree; end
