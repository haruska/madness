# frozen_string_literal: true

# For dotenv loading in test
ENV['RAILS_ENV'] ||= 'test'

# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

if Rails.env.local?

  # Rubocop
  require 'rubocop/rake_task'
  RuboCop::RakeTask.new do |task|
    task.plugins << 'rubocop-rails'
  end

  task(:default).clear.enhance(%w[rubocop spec])
end
