# frozen_string_literal: true

class UpdateBestFinishesJob
  include Faktory::Job

  # This enqueues a job to (eventually) be performed by the Golang worker
  def self.perform_later
    jid = SecureRandom.hex(8)
    Faktory.server_pool.with do |client|
      client.push({ jid:, jobtype: 'UpdateBestFinishesJob', args: [] })
    end
    jid
  end

  def perform
    eliminations = Eliminations.new
    eliminations.results(Tournament.field_64.decision_team_slots)

    eliminations.acc.each do |bracket_id, best_finish|
      Bracket.find(bracket_id).update(best_possible_finish: best_finish)
    end
  end
end
