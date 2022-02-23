# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::UserType do
  subject { described_class }

  it_behaves_like 'a BaseNodeObject', :user
end
