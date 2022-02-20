# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    redirect_to auth.sign_in_path unless current_user
  end

  def sign_out
    reset_session
    redirect_to auth.sign_in_path
  end
end
