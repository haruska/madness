import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import Tournament from '../../components/Tournament'
import BracketActions from './BracketActions'

export const COMPLETED_MASK = 18446744073709551614n

class Bracket extends Component {
  title = () => {
    const { bracket } = this.props
    const { user } = bracket

    return `${bracket.name} (${user.name})`
  }

  render() {
    const { bracket } = this.props
    const tournament = bracket.tournament

    const cleanBracket = {
      ...bracket,
      gameDecisions: BigInt(bracket.gameDecisions),
      gameMask: COMPLETED_MASK,
    }

    return (
      <div className="bracket-container">
        <h2>{this.title()}</h2>
        <BracketActions bracket={bracket} />
        <Tournament tournament={tournament} bracket={cleanBracket} />
      </div>
    )
  }
}

export default createFragmentContainer(Bracket, {
  bracket: graphql`
    fragment Bracket_bracket on Bracket {
      id
      name
      tieBreaker
      gameDecisions
      user {
        name
      }
      tournament {
        ...Tournament_tournament
      }

      ...BracketActions_bracket
    }
  `,
})
