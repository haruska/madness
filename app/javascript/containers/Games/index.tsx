import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import Tournament from '../../components/Tournament'

class Games extends Component {
  render() {
    // @ts-ignore
      const tournament = this.props.tournament
    return (
      <div className="games-container">
        <h2>{tournament.id}</h2>
        <Tournament tournament={tournament} />
      </div>
    )
  }
}

export default createFragmentContainer(Games, {
  tournament: graphql`
    fragment Games_tournament on Tournament {
        id
        ...Tournament_tournament
    }
  `,
})
