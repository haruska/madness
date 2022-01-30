# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BinaryDecisionTree::Node do
  subject { described_class }

  describe 'creating a new node' do
    let(:tree) { BinaryDecisionTree::Tree.new(1) }

    it 'should take both a tree and slot number and expose them' do
      node = BinaryDecisionTree::Node.new(tree, 1)

      expect(node.tree).to eq(tree)
      expect(node.slot).to eq(1)
      expect(node.decision).to be_nil
    end
  end

  describe 'calculating a value' do
    let(:tree) { BinaryDecisionTree::Tree.new(2) }
    let(:nodes) do
      tree.size.times.collect do |i|
        node = tree.at(i)
        node.decision = rand(2) unless node.nil?
        node
      end
    end

    context 'when decision is left' do
      before do
        nodes.each { |n| n.decision = BinaryDecisionTree::Node::LEFT unless n.nil? }
      end

      it 'should return the slot id of next left position on a leaf' do
        node = nodes.last

        expect(node).to be_leaf
        expect(node.value).to eq(node.left_position)
      end
    end

    describe 'when decision is right' do
      before do
        nodes.each { |n| n.decision = BinaryDecisionTree::Node::RIGHT unless n.nil? }
      end

      it 'should return the slot id of next right position on a leaf' do
        node = nodes.last

        expect(node).to be_leaf
        expect(node.value).to eq(node.right_position)
      end
    end

    it 'should traverse the tree until at a leaf and return that value' do
      node = tree.root
      node.decision = BinaryDecisionTree::Node::LEFT

      expect(node.value).to eq(node.left.value)
    end

    it 'should be nil if a decision is not set' do
      node = BinaryDecisionTree::Tree.new(1).root

      expect(node.decision).to be_nil
      expect(node.value).to be_nil
    end
  end

  describe 'a leaf node' do
    let(:node) { BinaryDecisionTree::Tree.new(2).at(2) }

    it 'should know it is a leaf node' do
      expect(node).to be_leaf
    end

    it 'should not have a left or right child in the tree' do
      expect(node.left).to be_nil
      expect(node.right).to be_nil
    end

    it 'should still have left and right positions' do
      expect(node.left_position).not_to be_nil
      expect(node.right_position).not_to be_nil
    end

    it 'should have a parent' do
      expect(node.parent).to be_present
    end
  end

  describe 'current depth calculation' do
    let(:depth_hash) do
      depth_hash = {}

      # bfs
      tree = BinaryDecisionTree::Tree.new(6) # 63 nodes
      tree.depth.times do |i|
        current_depth = i + 1
        depth_hash[current_depth] = []
        if current_depth == 1
          depth_hash[current_depth] << tree.root
        else
          depth_hash[current_depth - 1].each do |parent_node|
            depth_hash[current_depth] << parent_node.left
            depth_hash[current_depth] << parent_node.right
          end
        end
      end

      depth_hash
    end

    it 'should return the correct depth' do
      depth_hash.each do |depth, nodes|
        nodes.each do |node|
          expect(node.current_depth).to eq(depth)
        end
      end
    end
  end

  describe 'parent position calculation' do
    let(:tree) { BinaryDecisionTree::Tree.new(6) }

    it 'should be half of the current slot value' do
      i = 1
      while !tree.at(i).nil? && !tree.at(i).left.nil?
        node = tree.at(i)
        expect(node.left.parent).to be(node)
        expect(node.right.parent).to be(node)
        i += 1
      end
    end

    it 'should have a get node helper' do
      node = tree.at(3)
      expect(node.parent_position).to eq(1)
      expect(node.parent).to be(tree.at(1))
    end
  end

  describe 'child position calculations' do
    let(:tree) { BinaryDecisionTree::Tree.new(3) }
    let(:node) { tree.at(2) }

    describe 'left position calculation' do
      it 'should be twice the current slot value' do
        expect(node.left_position).to eq(4)
      end

      it 'should have a get node helper' do
        expect(node.left).to be(tree.at(4))
      end
    end

    describe 'right position calculation' do
      it 'should be next to the left child (one greater)' do
        expect(node.right_position).to eq(5)
      end

      it 'should have a get node helper' do
        expect(node.right).to be(tree.at(5))
      end
    end
  end
end
