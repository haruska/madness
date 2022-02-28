import React, { Component } from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { Link } from 'found'

import BestPossible from './BestPossibleSmall'
import FinalFourTeam from 'components/FinalFourTeamSmall'

export class SmallBracket extends Component {
  render() {
    const { bracket, showEliminated, index, viewer, tied } = this.props
    const { currentUser } = viewer
    const finalFourTeams = bracket.finalFour
    const bracketName = showEliminated && bracket.eliminated ? `* ${bracket.name}` : bracket.name
    const bracketPath = `/brackets/${bracket.id}`

    let place = `${index}.`
    if (tied) {
      place = `T${place}`
    }

    let rowClasses = ['bracket-row']
    if (bracket.user.id === currentUser.id) {
      rowClasses.push('current-user-bracket')
    }

    return (
      <div className="small-bracket">
        <Link to={bracketPath} className="bracket-link">
          <div className={rowClasses.join(' ')}>
            <div>
              <div className="bracket-position">{place}</div>
              <div className="bracket-details">
                <div className="bracket-name">{bracketName}</div>
                <div className="points">
                  <div className="total-points">{bracket.points}</div>
                  <div className="possible-points">{bracket.possiblePoints}</div>
                </div>
                <BestPossible bracket={bracket} showEliminated={showEliminated} />
                <div className="final-four-teams">
                  {finalFourTeams.map((team, i) => (
                    <FinalFourTeam key={i} place={i} team={team} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default createFragmentContainer(SmallBracket, {
  bracket: graphql`
    fragment SmallBracket_bracket on Bracket {
      id
      name
      points
      possiblePoints
      eliminated
      user {
        id
      }
      finalFour {
        ...FinalFourTeamSmall_team
      }
      ...BestPossibleSmall_bracket
    }
  `,
  viewer: graphql`
    fragment SmallBracket_viewer on Viewer {
      currentUser {
        id
      }
    }
  `,
})
