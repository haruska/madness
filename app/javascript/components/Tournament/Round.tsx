import React, { useContext } from 'react'
import { range, chunk } from 'lodash'
import classNames from 'classnames'

import { Region } from './Region'
import { Game } from './Game'
import { AppContext, Tournament } from 'AppContext'
import { BracketData } from 'containers/Bracket'

export const Round = ({
  round,
  bracket,
  onSlotClick,
  highlightEmpty,
}: {
  round: Tournament['rounds'][0]
  bracket?: BracketData
  onSlotClick?: () => void
  highlightEmpty?: boolean
}) => {
  const { tournament } = useContext(AppContext)

  const gameSlots = () => {
    const depthFor =
      range(1, tournament.rounds.length + 1)
        .reverse()
        .indexOf(round.number) + 1
    if (depthFor === 0) {
      return [1]
    } else {
      return range(Math.pow(2, depthFor - 1), Math.pow(2, depthFor))
    }
  }

  const gameSlotsByRegion = () => {
    const slots = gameSlots()
    const chunkSize = slots.length / round.regions.length
    return chunk(slots, chunkSize)
  }

  if (round.regions) {
    return (
      <div className={classNames('round', `round${round.number}`)}>
        {round.regions.map((r, i) => (
          <Region
            key={i}
            index={i + 1}
            region={r}
            gameSlots={gameSlotsByRegion()[i]}
            bracket={bracket}
            roundNumber={round.number}
            onSlotClick={onSlotClick}
            highlightEmpty={highlightEmpty}
          />
        ))}
      </div>
    )
  } else {
    return (
      <div className={classNames('round', `round${round.number}`)}>
        {gameSlots().map((slot, i) => (
          <Game
            key={i}
            index={i + 1}
            slot={slot}
            roundNumber={round.number}
            bracket={bracket}
            onSlotClick={onSlotClick}
            highlightEmpty={highlightEmpty}
          />
        ))}
      </div>
    )
  }
}
