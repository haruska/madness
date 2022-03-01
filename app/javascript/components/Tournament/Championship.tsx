import React, { useContext } from 'react'
import classNames from 'classnames'

import TournamentTree from 'objects/TournamentTree'
import Team from 'objects/Team'
import { BracketData } from 'containers/Bracket'
import { AppContext } from 'AppContext'

export const Championship = ({
  bracket,
  highlightEmpty,
}: {
  bracket?: BracketData
  highlightEmpty: boolean
}) => {
  const { tournament, teams } = useContext(AppContext)

  const tournamentTree = () => {
    const { rounds, gameDecisions, gameMask } = tournament
    return new TournamentTree(rounds.length, gameDecisions, gameMask)
  }

  const bracketTree = () => {
    if (bracket) {
      const { rounds } = tournament
      const { gameDecisions, gameMask } = bracket
      return new TournamentTree(rounds.length, gameDecisions, gameMask)
    } else {
      return null
    }
  }

  const game = () => {
    return tournamentTree().gameNodes[1]
  }

  const pick = () => {
    const brTree = bracketTree()
    return brTree ? brTree.gameNodes[1] : null
  }

  const teamByStartingSlot = (slot?: number) => {
    if (slot) {
      return new Team(
        tournamentTree(),
        teams.find((team) => team.startingSlot === slot)
      )
    }
    return null
  }

  const championName = () => {
    const startingSlot = pick()
      ? pick().winningTeamStartingSlot()
      : game().winningTeamStartingSlot()
    if (startingSlot) {
      return teamByStartingSlot(startingSlot).name
    }
  }

  const pickLabel = () => {
    let pickClass = ''
    const theGame = game()
    const thePick = pick()

    if (theGame && thePick) {
      const team = teamByStartingSlot(thePick.winningTeamStartingSlot())
      const gameTeam = teamByStartingSlot(theGame.winningTeamStartingSlot())
      if (team && (!team.stillPlaying() || gameTeam)) {
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
