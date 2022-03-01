import React, { useContext } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { Link } from 'found'

import BracketStatus from './BracketStatus'
import FinalFourTeam from 'components/FinalFourTeam'
import { AppContext } from 'AppContext'
import { UserBracketRow_bracket$data } from 'RelayArtifacts/UserBracketRow_bracket.graphql'

const Component = ({ bracket }: { bracket: UserBracketRow_bracket$data }) => {
  const { teams } = useContext(AppContext)

  const finalFourTeams = bracket.sortedFour.map((slot) =>
    teams.find((team) => team.startingSlot === slot)
  )
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

export const UserBracketRow = createFragmentContainer(Component, {
  bracket: graphql`
    fragment UserBracketRow_bracket on Bracket {
      id
      name
      tieBreaker
      paid
      sortedFour
    }
  `,
})
