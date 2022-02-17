# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    redirect_to(auth.sign_in_path) && return unless current_user

    render layout: 'main'
  end

  def sign_out
    reset_session
    redirect_to root_path
  end
end
