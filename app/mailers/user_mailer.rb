# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def validate_email(user, url)
    @user = user
    @url  = url
    mail to: @user.email, subject: "Sign in to #{ENV.fetch('HOST', 'madness')}"
  end
end
