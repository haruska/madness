# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable,
         # :omniauthable,
         # :confirmable,
         :recoverable,
         # :registerable,
         :rememberable,
         :trackable,
         :timeoutable,
         # :lockable,
         :validatable

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: /.+@.+\..+/

  has_many :brackets, dependent: :destroy
end
