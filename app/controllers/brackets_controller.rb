# frozen_string_literal: true

class BracketsController < ApplicationController
  layout 'static'
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
