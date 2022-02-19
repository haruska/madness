import React, { Component } from 'react'
import classNames from 'classnames'

import TournamentTree from '../../objects/TournamentTree'
import Team from '../../objects/Team'

export default class Championship extends Component {
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

  game = () => {
    return this.tournamentTree().gameNodes[1]
  }

  pick = () => {
    const bracketTree = this.bracketTree()
    return bracketTree ? bracketTree.gameNodes[1] : null
  }

  teamByStartingSlot = (slot) => {
    if (slot) {
      return new Team(this.props.tournament, this.tournamentTree(), slot)
    }
    return null
  }

  championName = () => {
    const startingSlot = this.pick()
      ? this.pick().winningTeamStartingSlot()
      : this.game().winningTeamStartingSlot()
    if (startingSlot) {
      return this.teamByStartingSlot(startingSlot).name
    }
  }

  pickLabel = () => {
    let pickClass = ''
    const game = this.game()
    const pick = this.pick()

    if (game && pick) {
      const team = this.teamByStartingSlot(pick.winningTeamStartingSlot())
      const gameTeam = this.teamByStartingSlot(game.winningTeamStartingSlot())
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

  render() {
    const { highlightEmpty } = this.props
    const highlightClass = highlightEmpty && !this.championName() ? 'empty-pick' : null
    return (
      <div className="championship">
        <div className={classNames('champion-box', this.pickLabel(), highlightClass)}>
          {this.championName()}
        </div>
        <div className="champion-label">CHAMPION</div>
      </div>
    )
  }
}
