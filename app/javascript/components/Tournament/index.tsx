import React, { useContext } from 'react'
import { Round } from './Round'
import { Championship } from './Championship'
import RoundsBanner from './RoundsBanner'
import TieBreaker from './TieBreaker'
import { AppContext } from 'AppContext'
import { BasicBracket } from 'containers/Bracket'

export const Tournament = ({
  bracket,
  onSlotClick,
  editing,
  highlightEmpty,
}: {
  bracket?: BasicBracket
  onSlotClick?: () => void
  editing?: boolean
  highlightEmpty?: boolean
}) => {
  const { tournament } = useContext(AppContext)

  const { rounds } = tournament
  const fieldClass = rounds.length >= 6 ? 'field-64' : 'sweet-16'
  const tieBreaker = bracket ? bracket.tieBreaker : null

  return (
    <div className="tournament-component">
      <div className={fieldClass}>
        <div className="tournament-heading">
          <RoundsBanner rounds={rounds} />
        </div>
        <div className="tournament-body">
          {rounds.map((r) => (
            <Round
              key={r.number}
              round={r}
              bracket={bracket}
              onSlotClick={onSlotClick}
              highlightEmpty={highlightEmpty}
            />
          ))}
          <Championship bracket={bracket} highlightEmpty={highlightEmpty} />
          <TieBreaker tieBreaker={tieBreaker} editing={editing} />
        </div>
      </div>
    </div>
  )
}
