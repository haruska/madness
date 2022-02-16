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
    @tournament.update_game!(params[:position].to_i, params[:choice].to_i)
    redirect_to edit_tournament_path
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_tournament
    @tournament = authorize Tournament.field64
  end
end
