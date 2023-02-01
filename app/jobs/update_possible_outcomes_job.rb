class UpdatePossibleOutcomesJob < ApplicationJob
  queue_as :default

  def perform(_tournament_id, opts = {})
    opts = HashWithIndifferentAccess.new(update_db: true).merge(opts)

    timestamp = Time.now.to_i
    outcome_set_key = self.class.outcome_set_key(timestamp)

    Sidekiq.redis { |redis| redis.set outcome_set_key, -1 }

    5.times { CalculatePossibleOutcomeJob.perform_later(timestamp, opts) }
  end

  def self.outcome_set_key(timestamp)
    "outcomeset_#{timestamp}"
  end
end
