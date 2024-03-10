import React from 'react'
import classNames from 'classnames'

import TournamentTree from 'objects/TournamentTree'
import { Team } from 'objects/TournamentTypes'
import { BasicBracket } from 'components/BasicBracket'
import GameNode from 'objects/GameNode'

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
  tournamentTree,
  teams,
  bracket,
  index,
  slot,
  regionIndex,
  roundNumber,
  highlightEmpty,
  onSlotClick,
}: {
  tournamentTree: TournamentTree
  teams: readonly Team[]
  bracket?: BasicBracket
  index: number
  slot: number
  regionIndex?: number
  roundNumber: number
  highlightEmpty?: boolean
  onSlotClick?: (gameSlot: number, decision: number) => void
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

  const teamByStartingSlot = (slot?: number): Team | null =>
    teams.find((team) => team.startingSlot === slot)

  const renderTeam = (game: GameNode, pick: GameNode | null, slot: number) => {
    let team: Team
    let pickClass = ''
    if (slot === 1) {
      if (pick) {
        team = teamByStartingSlot(pick.firstTeamStartingSlot())
        const gameTeam = teamByStartingSlot(game.firstTeamStartingSlot())
        if (team && (!tournamentTree.stillPlaying(team) || gameTeam) && !game.isRoundOne()) {
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
        if (team && (!tournamentTree.stillPlaying(team) || gameTeam) && !game.isRoundOne()) {
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

  const game = tournamentTree.gameNodes[slot]
  const pick = bracketTree?.gameNodes[slot]

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
