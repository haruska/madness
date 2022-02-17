import React, { Component } from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import moment from 'moment'

import Round from './Round'
import Championship from './Championship'
import RoundsBanner from './RoundsBanner'
import TieBreaker from './TieBreaker'

class Tournament extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastUpdate: null,
    }
  }

  componentDidMount() {
    this.updateData()
  }

  updateData = () => {
    // @ts-ignore
    const { lastUpdate } = this.state
    if (lastUpdate) {
      if (
        moment()
          .subtract(10, 'seconds')
          .isAfter(lastUpdate)
      ) {
        // this.props.relay.forceFetch()
        this.setState({ lastUpdate: moment() })
      }
    } else {
      this.setState({ lastUpdate: moment() })
    }
  }

  render() {
    // @ts-ignore
    const { tournament, bracket, onSlotClick, editing, highlightEmpty } = this.props
    const { rounds } = tournament
    const fieldClass = rounds.length >= 6 ? 'field-64' : 'sweet-16'
    const tieBreaker = bracket ? bracket.tieBreaker : null

    return (
      <div className="tournament-component">
        <div className={fieldClass}>
          <div className="tournament-heading">
            <RoundsBanner rounds={rounds} />
          </div>
          <div className="tournament-body">
            {rounds.map(r => (
              <Round
                key={r.number}
                round={r}
                tournament={tournament}
                bracket={bracket}
                onSlotClick={onSlotClick}
                highlightEmpty={highlightEmpty}
              />
            ))}
            <Championship
              tournament={tournament}
              bracket={bracket}
              editing={editing}
              highlightEmpty={highlightEmpty}
            />
            <TieBreaker tieBreaker={tieBreaker} editing={editing} />
          </div>
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(Tournament, {
  tournament: graphql`
    fragment Tournament_tournament on Tournament {
      rounds {
        name
        number
        startDate
        endDate
        regions
      }
      tipOff
      gameDecisions
      gameMask
      teams {
        startingSlot
        seed
        name
      }
    }
  `,
})
