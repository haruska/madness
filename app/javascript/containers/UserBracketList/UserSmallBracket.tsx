import React, { useContext } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

import { Link } from 'found'

import { BracketStatus } from './BracketStatus'
import { FinalFourTeamSmall } from 'components/FinalFourTeamSmall'
import { AppContext } from 'AppContext'
import { UserSmallBracket_bracket$data } from 'RelayArtifacts/UserSmallBracket_bracket.graphql'

const Component = ({ bracket }: { bracket: UserSmallBracket_bracket$data }) => {
  const { teams } = useContext(AppContext)

  const finalFourTeams = bracket.sortedFour.map((slot) =>
    teams.find((team) => team.startingSlot === slot)
  )
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
                  <FinalFourTeamSmall key={i} team={team} />
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

export const UserSmallBracket = createFragmentContainer(Component, {
  bracket: graphql`
    fragment UserSmallBracket_bracket on Bracket {
      id
      name
      tieBreaker
      paid
      sortedFour
    }
  `,
})
