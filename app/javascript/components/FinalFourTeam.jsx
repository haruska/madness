import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

export class FinalFourTeam extends Component {
  render() {
    const { team } = this.props
    return <td key={team.id}>{team.name}</td>
  }
}

export default createFragmentContainer(FinalFourTeam, {
  team: graphql`
    fragment FinalFourTeam_team on Team {
      id
      name
    }
  `,
})
