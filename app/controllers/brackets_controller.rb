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
end
