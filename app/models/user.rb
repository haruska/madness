# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :rememberable, :validatable,
         :trackable, :passwordless_authenticatable

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: /.+@.+\..+/

  has_many :brackets, dependent: :destroy

  def password_required?
    false
  end

  # @return [Boolean] user should be remembered when they log in (with cookie)
  #   so he won't be asked to login again
  def remember_me
    true
  end
end
