# frozen_string_literal: true

module TournamentsHelper
  def tournament
    Tournament.field64
  end

  def date_range_string(start_date, end_date)
    date_str = start_date.strftime('%b %-d')

    date_str += "-#{end_date.strftime('%-d')}" if end_date > start_date

    date_str
  end
end
