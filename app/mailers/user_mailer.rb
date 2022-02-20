# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def validate_email(user, url)
    @user = user
    @url  = url
    mail to: @user.email, subject: 'Sign in into pool-madness.com'
  end
end
