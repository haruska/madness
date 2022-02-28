import React, { Component } from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { Link } from 'found'

import BestPossible from './BestPossible'
import FinalFourTeam from 'components/FinalFourTeam'

export class BracketRow extends Component {
  truncatedBracketName = (maxSize) => {
    maxSize = maxSize || 25
    const bracketName = this.props.bracket.name

    if (bracketName.length < maxSize) {
      return bracketName
    }

    const subString = bracketName.substr(0, maxSize - 1)
    const onWordBoundry = subString.substr(0, subString.lastIndexOf(' '))

    const truncatedName = onWordBoundry === '' ? subString : onWordBoundry

    return truncatedName + '...'
  }

  render() {
    const { bracket, index, showEliminated, viewer, tied } = this.props
    const { currentUser } = viewer
    const finalFourTeams = bracket.finalFour
    const bracketPath = `/brackets/${bracket.id}`

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
          <Link to={bracketPath}>{this.truncatedBracketName()}</Link>
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
}

export default createFragmentContainer(BracketRow, {
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
      finalFour {
        ...FinalFourTeam_team
      }
      ...BestPossible_bracket
    }
  `,
  viewer: graphql`
    fragment BracketRow_viewer on Viewer {
      currentUser {
        id
      }
    }
  `,
})
