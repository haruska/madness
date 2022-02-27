import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { Link } from 'found'

import BracketStatus from './BracketStatus'
import FinalFourTeam from 'components/FinalFourTeam'

export class UserBracketRow extends Component {
  render() {
    const { bracket } = this.props
    const finalFourTeams = bracket.finalFour
    const bracketPath = `/brackets/${bracket.id}`

    return (
      <tr>
        <td>
          <Link to={bracketPath}>{bracket.name}</Link>
        </td>
        {finalFourTeams.map((team, i) => (
          <FinalFourTeam key={i} team={team} place={i} />
        ))}
        <td>{bracket.tieBreaker}</td>
        <td>
          <BracketStatus paid={bracket.paid} />
        </td>
      </tr>
    )
  }
}

export default createFragmentContainer(UserBracketRow, {
  bracket: graphql`
    fragment UserBracketRow_bracket on Bracket {
      id
      name
      tieBreaker
      paid
      finalFour {
        ...FinalFourTeam_team
      }
    }
  `,
})
