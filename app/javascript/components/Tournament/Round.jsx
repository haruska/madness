import React, { Component } from 'react'
import { range, chunk } from 'lodash'
import classNames from 'classnames'

import Region from './Region'
import Game from './Game'

export default class Round extends Component {
  gameSlots = () => {
    const { tournament, round } = this.props
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

  gameSlotsByRegion = () => {
    const round = this.props.round
    const gameSlots = this.gameSlots()
    const chunkSize = gameSlots.length / round.regions.length
    return chunk(gameSlots, chunkSize)
  }

  render() {
    const { round, tournament, bracket, onSlotClick, highlightEmpty } = this.props
    if (round.regions) {
      return (
        <div className={classNames('round', `round${round.number}`)}>
          {round.regions.map((r, i) => (
            <Region
              key={i}
              index={i + 1}
              region={r}
              gameSlots={this.gameSlotsByRegion()[i]}
              tournament={tournament}
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
          {this.gameSlots().map((slot, i) => (
            <Game
              key={i}
              index={i + 1}
              slot={slot}
              tournament={tournament}
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
}
