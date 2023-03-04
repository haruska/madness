import React, { useContext } from 'react'
import {graphql, useFragment } from 'react-relay'
import { Link } from 'found'

import { BracketStatus } from './BracketStatus'
import { FinalFourTeam } from 'components/FinalFourTeam'
import { AppContext } from 'AppContext'
import { UserBracketRow_bracket$key } from 'RelayArtifacts/UserBracketRow_bracket.graphql'

export const UserBracketRow = ({ bracket: bracketKey }: { bracket: UserBracketRow_bracket$key }) => {
  const { teams } = useContext(AppContext)
  const bracket = useFragment(graphql`
      fragment UserBracketRow_bracket on Bracket {
          id
          name
          paid
          sortedFour
      }
  `, bracketKey)
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
        <FinalFourTeam key={i} team={team} />
      ))}
      <td>
        <BracketStatus paid={bracket.paid} />
      </td>
    </tr>
  )
}
