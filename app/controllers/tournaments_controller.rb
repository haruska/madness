# frozen_string_literal: true

class TournamentsController < ApplicationController
  def show
    tournament = Tournament.field_64
    authorize tournament
  end

  def edit
    tournament = Tournament.field_64
    authorize tournament
  end

  def update
    tournament = Tournament.field_64
    authorize tournament
    TournamentResult.results.update!(tournament_params)
    redirect_to tournament_path
  end

  protected

  def tournament_params
    params.expect(tournament: %i[game_decisions game_mask])
  end
end
