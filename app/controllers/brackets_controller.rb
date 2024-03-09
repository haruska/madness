# frozen_string_literal: true

class BracketsController < ApplicationController
  layout 'static'

  def index
    unless Tournament.field_64.started?
      redirect_to '/my_brackets'
      return
    end

    @brackets = policy_scope(Bracket).includes(:user).to_a.sort_by { |b| [b.points * -1, b.possible_points * -1] }
    @title = "Brackets (#{Bracket.count} total"
    @show_eliminated = Bracket.exists?(['best_possible_finish > ?', 1])
  end

  def my_brackets
    if Tournament.field_64.started?
      redirect_to '/brackets'
      return
    end

    @title = 'My Brackets'
    @brackets = current_user.brackets
  end

  def show
    @bracket = authorize Bracket.find(params[:id])
  end

  def new
    @bracket = Bracket.new
  end

  def edit
    @bracket = authorize Bracket.find(params[:id])
  end

  def create
    authorize Bracket
    @bracket = current_user.brackets.build(bracket_params)
    if @bracket.save
      redirect_to @bracket, notice: 'Bracket was successfully created.'
    else
      render :new
    end
  end

  def update
    @bracket = authorize Bracket.find(params[:id])
    if @bracket.update(bracket_params)
      redirect_to @bracket, notice: 'Bracket was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    bracket = authorize Bracket.find(params[:id])
    if bracket.destroy
      render nothing: true, status: :ok
    else
      render json: { error: 'Failed to delete bracket' }, status: :unprocessable_entity
    end
  end

  protected

  def bracket_params
    params.require(:bracket).permit(:name, :game_decisions)
  end
end
