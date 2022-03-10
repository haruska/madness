# frozen_string_literal: true

class Round
  include ActiveAttr::Model
  include GlobalID::Identification

  NAMES = ['Field 64', 'Field 32', 'Sweet 16', 'Elite Eight', 'Final Four', 'Champion'].freeze

  attribute :number, type: Integer

  validates :number, presence: true

  def self.find(graph_id)
    _, round_number = graph_id.split('~')
    Tournament.rounds[round_number.to_i - 1]
  end

  def self.round_num_for_slot(slot)
    depth = Math.log2(slot).floor + 1
    (1..6).to_a.reverse[depth - 1]
  end

  def id
    "round~#{number}"
  end

  def name
    NAMES[number - 1]
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

  def graph_type
    'Types::RoundType'.constantize
  end

  private

  def start_date_for(round_number)
    case round_number
    when 1
      Tournament.tip_off.to_date
    when 2, 4, 6
      start_date_for(round_number - 1) + 2.days
    else
      day = start_date_for(round_number - 1) + 5.days
      day += (round_number - 3).days
      day
    end
  end
end
