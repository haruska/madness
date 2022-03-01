import React, { Component, useContext } from 'react'
import classNames from 'classnames'

import TournamentTree from 'objects/TournamentTree'
import Team from 'objects/Team'
import { AppContext } from '../../AppContext'
import { BracketData, COMPLETED_MASK } from '../../containers/Bracket'

const GameSlot = ({
  gameSlot,
  team,
  decision,
  pickClass,
  highlightEmpty,
  onSlotClick,
}: {
  gameSlot: number
  team: Team
  decision: number
  pickClass: string
  highlightEmpty: boolean
  onSlotClick: (gameSlot: number, decision: number) => void
}) => {
  const handleClick = () => {
    if (onSlotClick) {
      onSlotClick(gameSlot, decision)
    }
  }

  const highlightClass = highlightEmpty ? 'empty-pick' : null

  if (team) {
    return (
      <p className={classNames('slot', `slot${decision}`, pickClass)} onClick={handleClick}>
        <span className="seed">{team.seed}</span> {team.name}
      </p>
    )
  }
  return (
    <p className={classNames('slot', `slot${decision}`, highlightClass)}>
      {highlightEmpty ? <span>&nbsp;</span> : ''}
    </p>
  )
}

export const Game = ({
  bracket,
  index,
  slot,
  regionIndex,
  roundNumber,
  highlightEmpty,
  onSlotClick,
}: {
  bracket: BracketData
  index: number
  slot: number
  regionIndex?: number
  roundNumber: number
  highlightEmpty: boolean
  onSlotClick: (gameSlot: number, decision: number) => void
}) => {
  const { tournament, teams } = useContext(AppContext)

  const tournamentTree = () => {
    const { rounds, gameDecisions, gameMask } = tournament
    return new TournamentTree(rounds.length, gameDecisions, gameMask)
  }

  const bracketTree = () => {
    if (bracket) {
      const { rounds } = tournament
      const { gameDecisions } = bracket
      return new TournamentTree(rounds.length, gameDecisions, COMPLETED_MASK)
    } else {
      return null
    }
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

  const renderTeam = (game, pick, slot) => {
    let team = null
    let pickClass = ''
    if (slot === 1) {
      if (pick) {
        team = teamByStartingSlot(pick.firstTeamStartingSlot())
        const gameTeam = teamByStartingSlot(game.firstTeamStartingSlot())
        if (team && (!team.stillPlaying() || gameTeam) && !game.isRoundOne()) {
          if (gameTeam && team.name === gameTeam.name) {
            pickClass = 'correct-pick'
          } else {
            pickClass = 'eliminated'
          }
        }
      } else {
        team = teamByStartingSlot(game.firstTeamStartingSlot())
      }
    } else {
      // slot == 2
      if (pick) {
        team = teamByStartingSlot(pick.secondTeamStartingSlot())
        const gameTeam = teamByStartingSlot(game.secondTeamStartingSlot())
        if (team && (!team.stillPlaying() || gameTeam) && !game.isRoundOne()) {
          if (gameTeam && team.name === gameTeam.name) {
            pickClass = 'correct-pick'
          } else {
            pickClass = 'eliminated'
          }
        }
      } else {
        team = teamByStartingSlot(game.secondTeamStartingSlot())
      }
    }

    return (
      <GameSlot
        gameSlot={game.slot}
        decision={slot}
        team={team}
        pickClass={pickClass}
        highlightEmpty={highlightEmpty}
        onSlotClick={onSlotClick}
      />
    )
  }

  const game = tournamentTree().gameNodes[slot]
  const brTree = bracketTree()
  const pick = brTree ? brTree.gameNodes[slot] : null

  let classes = ['match', `m${index}`, `round${roundNumber}`]
  if (regionIndex) {
    classes.push(`region${regionIndex}`)
  }

  return (
    <div className={classNames(classes)}>
      {renderTeam(game, pick, 1)}
      {renderTeam(game, pick, 2)}
    </div>
  )
}
