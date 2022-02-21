# frozen_string_literal: true

class Bracket < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, uniqueness: true
  validates :tie_breaker, presence: true
end
