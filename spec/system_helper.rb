# frozen_string_literal: true

# Load general RSpec Rails configuration
require 'rails_helper'
require 'passwordless/test_helpers'

# Load configuration files and helpers
Dir[File.join(__dir__, 'system/support/**/*.rb')].each { |file| require file }
