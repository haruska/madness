# frozen_string_literal: true

module BinaryDecisionTree
  class MarshalledTree
    attr_reader :depth, :decisions, :mask

    def initialize(depth, decisions, mask)
      @depth = depth
      @decisions = decisions
      @mask = mask
    end

    def self.from_tree(tree)
      depth = tree.depth
      decisions = 0
      mask = 0

      (2**tree.depth).times do |i|
        next if i.zero?

        node = tree.at(i)
        unless node.decision.nil?
          mask |= 1 << i
          decisions |= node.decision << i
        end
      end

      new(depth, decisions, mask)
    end

    def to_tree(tree_class: Tree)
      tree = tree_class.new(depth)

      (2**tree.depth).times do |i|
        next if i.zero?

        current_position = 1 << i

        if mask.anybits?(current_position)
          node = tree.at(i)
          node.decision = decisions.nobits?(current_position) ? 0 : 1
        end
      end

      tree
    end

    def ==(other)
      other.class == self.class && other.state == state
    end

    alias eql? ==

    delegate :hash, to: :state

    protected

    def state
      [depth, decisions, mask]
    end
  end
end
