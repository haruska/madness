import React, { Component } from 'react'
import classNames from 'classnames'

import TournamentTree from '../../objects/TournamentTree'
import Team from '../../objects/Team'

class GameSlot extends Component {
  handleClick = () => {
    const { gameSlot, decision, onSlotClick } = this.props
    if (onSlotClick) {
      onSlotClick(gameSlot, decision)
    }
  }

  render() {
    const { team, decision, pickClass, highlightEmpty } = this.props
    const highlightClass = highlightEmpty ? 'empty-pick' : null

    if (team) {
      return (
        <p className={classNames('slot', `slot${decision}`, pickClass)} onClick={this.handleClick}>
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
}

export default class Game extends Component {
  tournamentTree = () => {
    const { rounds, gameDecisions, gameMask } = this.props.tournament
    return new TournamentTree(rounds.length, gameDecisions, gameMask)
  }

  bracketTree = () => {
    if (this.props.bracket) {
      const { rounds } = this.props.tournament
      const { gameDecisions, gameMask } = this.props.bracket
      return new TournamentTree(rounds.length, gameDecisions, gameMask)
    } else {
      return null
    }
  }

  teamByStartingSlot = (slot) => {
    if (slot) {
      return new Team(this.props.tournament, this.tournamentTree(), slot)
    }
    return null
  }

  renderTeam = (game, pick, slot) => {
    let team = null
    let pickClass = ''
    if (slot === 1) {
      if (pick) {
        team = this.teamByStartingSlot(pick.firstTeamStartingSlot())
        const gameTeam = this.teamByStartingSlot(game.firstTeamStartingSlot())
        if (team && (!team.stillPlaying() || gameTeam) && !game.isRoundOne()) {
          if (gameTeam && team.name === gameTeam.name) {
            pickClass = 'correct-pick'
          } else {
            pickClass = 'eliminated'
          }
        }
      } else {
        team = this.teamByStartingSlot(game.firstTeamStartingSlot())
      }
    } else {
      // slot == 2
      if (pick) {
        team = this.teamByStartingSlot(pick.secondTeamStartingSlot())
        const gameTeam = this.teamByStartingSlot(game.secondTeamStartingSlot())
        if (team && (!team.stillPlaying() || gameTeam) && !game.isRoundOne()) {
          if (gameTeam && team.name === gameTeam.name) {
            pickClass = 'correct-pick'
          } else {
            pickClass = 'eliminated'
          }
        }
      } else {
        team = this.teamByStartingSlot(game.secondTeamStartingSlot())
      }
    }

    return (
      <GameSlot
        gameSlot={game.slot}
        decision={slot}
        team={team}
        pickClass={pickClass}
        highlightEmpty={this.props.highlightEmpty}
        onSlotClick={this.props.onSlotClick}
      />
    )
  }

  render() {
    const { index, slot, regionIndex, roundNumber } = this.props
    const game = this.tournamentTree().gameNodes[slot]
    const bracketTree = this.bracketTree()
    const pick = bracketTree ? bracketTree.gameNodes[slot] : null

    let classes = ['match', `m${index}`, `round${roundNumber}`]
    if (regionIndex) {
      classes.push(`region${regionIndex}`)
    }

    return (
      <div className={classNames(classes)}>
        {this.renderTeam(game, pick, 1)}
        {this.renderTeam(game, pick, 2)}
      </div>
    )
  }
}
