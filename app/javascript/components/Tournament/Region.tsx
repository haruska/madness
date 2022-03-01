import React, { Component } from 'react'
import classNames from 'classnames'

import { Game } from './Game'
import { BracketData } from 'containers/Bracket'

export const Region = ({
  gameSlots,
  index,
  region,
  roundNumber,
  bracket,
  onSlotClick,
  highlightEmpty,
}: {
  gameSlots: number[]
  index: number
  region: string
  roundNumber: number
  bracket?: BracketData
  onSlotClick?: (gameSlot: number, decision: number) => void
  highlightEmpty?: boolean
}) => {
  return (
    <div className="region-component">
      {roundNumber === 1 ? (
        <div className={classNames('region-label', `region${index}`)}>{region}</div>
      ) : null}
      {gameSlots.map((slot, i) => (
        <Game
          key={i}
          index={i + 1}
          slot={slot}
          regionIndex={index}
          roundNumber={roundNumber}
          bracket={bracket}
          onSlotClick={onSlotClick}
          highlightEmpty={highlightEmpty}
        />
      ))}
    </div>
  )
}
