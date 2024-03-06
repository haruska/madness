import React from 'react'
import classNames from 'classnames'

import { Game } from './Game'
import { BasicBracket } from 'components/BasicBracket'
import { Team } from '../../AppContext'
import TournamentTree from '../../objects/TournamentTree'

export const Region = ({
  tournamentTree,
  teams,
  gameSlots,
  index,
  region,
  roundNumber,
  bracket,
  onSlotClick,
  highlightEmpty,
}: {
  tournamentTree: TournamentTree
  teams: readonly Team[]
  gameSlots: number[]
  index: number
  region: string
  roundNumber: number
  bracket?: BasicBracket
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
          tournamentTree={tournamentTree}
          teams={teams}
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
