# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    def redirect_from_magic_link
      user = User.find_by(login_token: params[:login_token])

      if user.present?
        # allow token to be re-used for now.
        # user.update(login_token: nil, login_token_valid_until: 1.year.ago)
        sign_in(user)
        redirect_to root_path
      else
        flash[:alert] = 'There was an error while login. Please enter your email again.'
        redirect_to new_user_session_path
      end
    end
  end
end
