# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::BracketType do
  subject { described_class }

  it_behaves_like 'a BaseNodeObject', :bracket
end
