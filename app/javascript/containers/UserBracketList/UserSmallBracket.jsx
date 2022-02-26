import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

import { Link } from 'found'

import BracketStatus from './BracketStatus'
import FinalFourTeamSmall from '../../components/FinalFourTeamSmall'

export class UserSmallBracket extends Component {
  render() {
    const { bracket } = this.props
    const finalFourTeams = bracket.finalFour
    const bracketPath = `/brackets/${bracket.id}`

    return (
      <div className="user-small-bracket">
        <Link className="bracket-link" to={bracketPath}>
          <div className="bracket-row">
            <div>
              <div className="position">&nbsp;</div>
              <div className="bracket-details">
                <div className="name-wrapper">
                  <div className="bracket-name">{bracket.name}</div>
                  <div className="status">
                    <BracketStatus paid={bracket.paid} />
                  </div>
                </div>
                <div className="final-four-teams">
                  {finalFourTeams.map((team, i) => (
                    <FinalFourTeamSmall key={i} team={team} place={i} />
                  ))}
                </div>
                <div className="tie-breaker">{bracket.tieBreaker}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default createFragmentContainer(UserSmallBracket, {
  bracket: graphql`
    fragment UserSmallBracket_bracket on Bracket {
      id
      name
      tieBreaker
      paid
      finalFour {
        ...FinalFourTeamSmall_team
      }
    }
  `,
})
