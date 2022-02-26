import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

export class FinalFourTeamSmall extends Component {
  render() {
    const { team } = this.props
    return <div className="final-four-team-small-component">{team.name}</div>
  }
}

export default createFragmentContainer(FinalFourTeamSmall, {
  team: graphql`
    fragment FinalFourTeamSmall_team on Team {
      id
      name
    }
  `,
})
