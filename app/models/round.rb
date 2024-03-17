# frozen_string_literal: true

class Round
  include ActiveAttr::Model
  include GlobalID::Identification

  NAMES = ['Field 64', 'Field 32', 'Sweet 16', 'Elite Eight', 'Final Four', 'Champion'].freeze

  attribute :tournament
  attribute :number, type: Integer

  validates :tournament, :number, presence: true

  def self.round_num_for_slot(slot)
    depth = Math.log2(slot).floor + 1
    (1..6).to_a.reverse[depth - 1]
  end

  def name
    names = NAMES.last(tournament.num_rounds)
    names[number - 1]
  end

  def start_date
    start_date_for(number)
  end

  def end_date
    if NAMES.last(2).include?(name)
      start_date
    else
      start_date + 1.day
    end
  end

  def regions
    Team::REGIONS if ['Final Four', 'Champion'].exclude?(name)
  end

  private

  def start_date_for(round_number)
    case round_number
    when 1
      tournament.tip_off.to_date + 1.day
    when 2, 4, 6
      start_date_for(round_number - 1) + 2.days
    else
      day = start_date_for(round_number - 1) + 5.days
      day += tournament.num_rounds > 4 ? (round_number - 3).days : (round_number - 1).days
      day
    end
  end
end
