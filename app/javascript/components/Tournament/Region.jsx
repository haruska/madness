import React, { Component } from 'react'
import classNames from 'classnames'

import Game from './Game'

export default class Region extends Component {
  render() {
    const {
      gameSlots,
      index,
      region,
      roundNumber,
      tournament,
      bracket,
      onSlotClick,
      highlightEmpty,
    } = this.props
    return (
      <div className="region-component">
        {roundNumber === 1 ? (
          <div className={classNames('region-label', `region${index}`)}>{region}</div>
        ) : null}
        {gameSlots.map((slot, i) => (
          <Game
            key={i}
            index={i + 1}
            slot={slot}
            tournament={tournament}
            regionIndex={index}
            roundNumber={roundNumber}
            bracket={bracket}
            onSlotClick={onSlotClick}
            highlightEmpty={highlightEmpty}
          />
        ))}
      </div>
    )
  }
}
