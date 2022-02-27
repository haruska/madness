# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Bracket, type: :model do
  subject { create(:bracket) }

  it { is_expected.to be_valid }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_uniqueness_of(:name) }
  it { is_expected.to validate_presence_of(:tie_breaker) }

  it { is_expected.to belong_to(:user) }

  it { is_expected.to_not be_paid }
end
