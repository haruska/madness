import React, { useContext } from 'react'
import classNames from 'classnames'

import TournamentTree from 'objects/TournamentTree'
import { BasicBracket } from 'components/BasicBracket'
import { Team, Tournament } from 'AppContext'

export const Championship = ({
  bracket,
  highlightEmpty,
  tournament,
  tournamentTree,
  teams
}: {
  bracket?: BasicBracket
  highlightEmpty: boolean
  tournament: Tournament
  tournamentTree: TournamentTree
  teams: readonly Team[]
}) => {
  const genBracketTree = () => {
    if (bracket) {
      const { gameDecisions, gameMask } = bracket
      return new TournamentTree(gameDecisions, gameMask)
    } else {
      return null
    }
  }

  const bracketTree = genBracketTree()
  const game = tournamentTree.gameNodes[1]
  const pick = bracketTree?.gameNodes[1]

  const teamByStartingSlot = (slot?: number): Team | null =>
    teams.find((team) => team.startingSlot === slot)

  const championName = () => {
    const startingSlot = pick ? pick.winningTeamStartingSlot() : game.winningTeamStartingSlot()
    if (startingSlot) {
      return teamByStartingSlot(startingSlot).name
    }
  }

  const pickLabel = () => {
    let pickClass = ''

    if (game && pick) {
      const team = teamByStartingSlot(pick.winningTeamStartingSlot())
      const gameTeam = teamByStartingSlot(game.winningTeamStartingSlot())
      if (team && (!tournamentTree.stillPlaying(team) || gameTeam)) {
        if (gameTeam && team.name === gameTeam.name) {
          pickClass = 'correct-pick'
        } else {
          pickClass = 'eliminated'
        }
      }

      return pickClass
    }
  }

  const highlightClass = highlightEmpty && !championName() ? 'empty-pick' : null
  return (
    <div className="championship">
      <div className={classNames('champion-box', pickLabel(), highlightClass)}>
        {championName()}
      </div>
      <div className="champion-label">CHAMPION</div>
    </div>
  )
}
