# frozen_string_literal: true

class UpdateScoresJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    yesterday = EspnScores.new(Time.zone.yesterday.to_date)
    today = EspnScores.new(Time.zone.today.to_date)

    yesterday.update_tournament
    today.update_tournament

    next_poll_time = if !yesterday.scores(EspnScores::STATUS_SCHEDULED).empty? ||
                        !yesterday.scores(EspnScores::STATUS_IN_PROGRESS).empty? ||
                        !today.scores(EspnScores::STATUS_IN_PROGRESS).empty?
                       5.minutes.from_now
                     elsif !today.scores(EspnScores::STATUS_SCHEDULED).empty?
                       2.hours.from_now
                     else
                       12.hours.from_now
                     end

    UpdateScoresJob.set(wait_until: next_poll_time).perform_later
  end
end
