import React, { useContext } from 'react'
import { Round } from './Round'
import { Championship } from './Championship'
import { RoundsBanner } from './RoundsBanner'
import { AppContext, Team, Tournament as ITournament } from 'AppContext'
import { BasicBracket } from 'containers/Bracket'
import TournamentTree from '../../objects/TournamentTree'

export const Tournament = ({
  bracket,
  onSlotClick,
  highlightEmpty,
  tournament,
  teams
}: {
  bracket?: BasicBracket
  onSlotClick?: (slotId: number, choice: number) => void
  highlightEmpty?: boolean,
  tournament?: ITournament
  teams?: readonly Team[]
}) => {
  if (!tournament) {
    tournament = useContext(AppContext).tournament
  }

  const tournamentTree = new TournamentTree(tournament.gameDecisions, tournament.gameMask)

  if (!teams) {
    teams = useContext(AppContext).teams
  }

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
          <Championship bracket={bracket} highlightEmpty={highlightEmpty} tournament={tournament} tournamentTree={tournamentTree} teams={teams} />
        </div>
      </div>
    </div>
  )
}
