# frozen_string_literal: true

module BracketsHelper
  def with_place(brackets)
    ret = []
    place = 0
    brackets.each_with_index do |bracket, i|
      place = i if !i.zero? && bracket.points != brackets[i - 1].points

      tied = i != 0 && ret[i - 1][1] == place
      ret[i - 1][2] = true if tied

      ret[i] = [bracket, place, tied]
    end
    ret
  end
end
