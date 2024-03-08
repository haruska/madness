# frozen_string_literal: true

class PagesController < ApplicationController
  layout 'static'
  def rules
    @title = 'Rules and Scoring'
    @prizes = [0.5, 0.2, 0.15, 0.1, 0.05]
  end
end
