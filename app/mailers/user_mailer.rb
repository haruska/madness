# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def validate_email(user, url)
    subject_host = ENV['HOST'] || 'pool-madness.com'
    @user = user
    @url  = url
    mail from: "Pool Madness <#{ENV['EMAIL_SENDER']}>", to: @user.email, subject: "Sign in to #{subject_host}"
  end
end
