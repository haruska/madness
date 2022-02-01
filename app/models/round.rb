# frozen_string_literal: true

class Round
  NAMES = ['Field 64', 'Field 32', 'Sweet 16', 'Elite Eight', 'Final Four', 'Champion'].freeze
  COUNT = NAMES.size

  attr_reader :number

  def self.all
    @all ||= (1..COUNT).to_a.map { |n| new(n) }
  end

  def self.by_number(num)
    all[num - 1]
  end

  def name
    NAMES[number - 1]
  end

  def start_date
    start_date_for(number)
  end

  def end_date
    number < COUNT - 1 ? start_date + 1.day : start_date # final four and championship on single day
  end

  def regions
    Team::REGIONS if number < COUNT - 1 # final four and championship no regions
  end

  private

  def initialize(num)
    @number = num
  end

  def start_date_for(round_number)
    @start_date_for ||= []

    @start_date_for[round_number] ||=
      case round_number
      when 1
        Tournament.field64.tip_off.to_date
      when 2, 4, 6
        start_date_for(round_number - 1) + 2.days
      else
        start_date_for(round_number - 1) + 5.days + (round_number - 3).days
      end
  end
end
