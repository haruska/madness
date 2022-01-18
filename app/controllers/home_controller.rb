class HomeController < ApplicationController
  def index
    current_user ? redirect_to(users_path) : redirect_to(auth.sign_in_path)
  end

  def sign_out
    reset_session
    redirect_to root_path
  end
end
