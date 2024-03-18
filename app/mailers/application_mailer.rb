# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: "Pool Madness <#{ENV.fetch('EMAIL_SENDER', nil)}>"
  layout 'mailer'
end
