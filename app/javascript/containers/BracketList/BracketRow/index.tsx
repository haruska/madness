import React, { useContext } from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { Link } from 'found'

import BestPossible from './BestPossible'
import FinalFourTeam from 'components/FinalFourTeam'
import { AppContext } from 'AppContext'
import { BracketRow_bracket$data } from 'RelayArtifacts/BracketRow_bracket.graphql'

const Component = ({
  bracket,
  index,
  showEliminated,
  tied,
}: {
  bracket: BracketRow_bracket$data
  index: number
  showEliminated?: boolean
  tied?: boolean
}) => {
  const { currentUser, teams } = useContext(AppContext)

  const truncatedBracketName = () => {
    const maxSize = 25
    const bracketName = bracket.name

    if (bracketName.length < maxSize) {
      return bracketName
    }

    const subString = bracketName.substr(0, maxSize - 1)
    const onWordBoundry = subString.substr(0, subString.lastIndexOf(' '))

    const truncatedName = onWordBoundry === '' ? subString : onWordBoundry

    return truncatedName + '...'
  }

  const finalFourTeams = bracket.sortedFour.map((slot) =>
    teams.find((team) => team.startingSlot === slot)
  )

  let place = `${index}.`
  if (tied) {
    place = `T${place}`
  }
  if (showEliminated && bracket.eliminated) {
    place = `* ${place}`
  }

  let rowClasses = ['bracket-row']
  if (bracket.user.id === currentUser.id) {
    rowClasses.push('current-user-bracket')
  }

  return (
    <tr className={rowClasses.join(' ')}>
      <td className="position-column">{place}</td>
      <td className="name-column">
        <Link to={`/brackets/${bracket.id}`}>{truncatedBracketName()}</Link>
      </td>
      <td>{bracket.points}</td>
      <td>{bracket.possiblePoints}</td>
      <BestPossible bracket={bracket} showEliminated={showEliminated} />
      {finalFourTeams.map((team, i) => (
        <FinalFourTeam key={i} team={team} />
      ))}
    </tr>
  )
}

export const BracketRow = createFragmentContainer(Component, {
  bracket: graphql`
    fragment BracketRow_bracket on Bracket {
      id
      name
      points
      possiblePoints
      eliminated
      user {
        id
      }
      sortedFour
      ...BestPossible_bracket
    }
  `,
})
