import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import Tournament from '../../components/Tournament'

class Games extends Component {
  render() {
    const tournament = this.props.viewer.tournament64
    return (
      <div className="games-container">
        <h2>Game Results</h2>
        <Tournament tournament={tournament} />
      </div>
    )
  }
}

export default createFragmentContainer(Games, {
  viewer: graphql`
    fragment Games_viewer on Viewer {
      tournament64 {
        ...Tournament_tournament
      }
    }
  `,
})
