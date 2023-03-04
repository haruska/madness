import React from 'react'
import { useFragment, graphql } from 'react-relay'
import { Tournament } from 'components/Tournament'
import { BracketActions } from './BracketActions'
import { Bracket_bracket$data } from 'RelayArtifacts/Bracket_bracket.graphql'
import { Bracket_bracket$key } from 'RelayArtifacts/Bracket_bracket.graphql'
export const COMPLETED_MASK = 18446744073709551614n

export interface BasicBracket {
  name: string
  gameDecisions: bigint
  gameMask: bigint
}

export interface BracketData extends BasicBracket {
  id: string
  user: Bracket_bracket$data['user']
}

// class Bracket extends Component {
export const Bracket = (props: { bracket: Bracket_bracket$key }) => {
  const bracket = useFragment(
    graphql`
        fragment Bracket_bracket on Bracket {
            id
            name
            gameDecisions
            user {
                name
            }
            ...BracketActions_bracket
        }
    `,
    props.bracket
  )
  const title = () => {
    const { user } = bracket
    return `${bracket.name} (${user.name})`
  }

  const cleanBracket: BracketData = {
    ...bracket,
    gameDecisions: BigInt(bracket.gameDecisions),
    gameMask: COMPLETED_MASK,
  }

  return (
    <div className="bracket-container">
      <div className="bracket-heading">
        <h2>{title()}</h2>
        <div>
          <BracketActions bracket={bracket} />
        </div>
      </div>
      <Tournament bracket={cleanBracket} />
    </div>
  )
}
