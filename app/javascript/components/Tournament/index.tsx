import React from 'react'
import { Round } from './Round'
import { Championship } from './Championship'
import { RoundsBanner } from './RoundsBanner'
import { Team, Tournament as ITournament } from 'objects/TournamentTypes'
import { BasicBracket } from 'components/BasicBracket'
import TournamentTree from 'objects/TournamentTree'

export const Tournament = ({
  bracket,
  onSlotClick,
  highlightEmpty,
  tournament,
  teams,
}: {
  bracket?: BasicBracket
  onSlotClick?: (slotId: number, choice: number) => void
  highlightEmpty?: boolean
  tournament: ITournament
  teams: readonly Team[]
}) => {
  const tournamentTree = new TournamentTree(tournament.gameDecisions, tournament.gameMask)
  const { rounds } = tournament

  return (
    <div className="tournament-component">
      <div className="field-64">
        <div className="tournament-heading">
          <RoundsBanner tournament={tournament} />
        </div>
        <div className="tournament-body">
          {rounds.map((r) => (
            <Round
              key={r.number}
              tournamentTree={tournamentTree}
              teams={teams}
              round={r}
              bracket={bracket}
              onSlotClick={onSlotClick}
              highlightEmpty={highlightEmpty}
            />
          ))}
          <Championship
            bracket={bracket}
            highlightEmpty={highlightEmpty}
            tournament={tournament}
            tournamentTree={tournamentTree}
            teams={teams}
          />
        </div>
      </div>
    </div>
  )
}
