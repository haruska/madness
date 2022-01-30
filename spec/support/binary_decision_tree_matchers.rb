# frozen_string_literal: true

require 'rspec/expectations'

RSpec::Matchers.define :be_same_tree do |expected|
  match do |actual|
    return false unless actual.depth == expected.depth

    expected.size.times do |i|
      next if i == 0

      exp_node = expected.at(i)
      act_node = actual.at(i)
      return false unless act_node.decision == exp_node.decision && act_node.slot == exp_node.slot
    end

    true
  end
end
