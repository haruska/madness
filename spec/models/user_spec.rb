require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  it { is_expected.to be_valid }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
  it { is_expected.to_not be_admin }

  it { is_expected.to allow_value("foo@bar.com").for(:email) }
  it { is_expected.to_not allow_value("foobar.bz").for(:email) }
end
