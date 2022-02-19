# frozen_string_literal: true

# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

if Rails.env.development? || Rails.env.test?

  # Rubocop
  require 'rubocop/rake_task'
  RuboCop::RakeTask.new do |task|
    task.requires << 'rubocop-rails'
  end

  # Graphql
  require 'graphql/rake_task'
  GraphQL::RakeTask.new(schema_name: 'MadnessSchema', directory: './')
  task schema: ['graphql:schema:idl']

  task(:default).clear.enhance(%w[rubocop schema spec])
end
