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
end
