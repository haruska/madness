# frozen_string_literal: true

class TournamentsController < ApplicationController
  before_action :require_user!
  before_action :set_tournament

  # GET /tournament
  def show; end

  # GET /tournament/edit
  def edit; end

  # PATCH/PUT /tournament
  def update
    if @tournament.update(tournament_params)
      redirect_to @tournament, notice: 'Tournament was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_tournament
    @tournament = Tournament.field64
  end

  # Only allow a list of trusted parameters through.
  def tournament_params
    params.fetch(:tournament, {})
  end
end
