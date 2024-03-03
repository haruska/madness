class BracketsController < ApplicationController
  def my_brackets
    if Tournament.field_64.started?
      redirect_to '/brackets'
      return
    end

    @brackets = current_user.brackets
  end
end
