import React, { useContext } from 'react'
import { graphql, createFragmentContainer, useFragment } from 'react-relay'
import { Link } from 'found'

import { BestPossibleSmall } from './BestPossibleSmall'
import { FinalFourTeamSmall } from 'components/FinalFourTeamSmall'
import { AppContext } from 'AppContext'
import { SmallBracket_bracket$key } from 'RelayArtifacts/SmallBracket_bracket.graphql'

const SmallBracket = ({
  bracket: bracketKey,
  showEliminated,
  index,
  tied,
}: {
  bracket: SmallBracket_bracket$key
  showEliminated?: boolean
  index: number
  tied?: boolean
}) => {
  const { teams, currentUser } = useContext(AppContext)
  const bracket = useFragment(graphql`
      fragment SmallBracket_bracket on Bracket {
          id
          name
          points
          possiblePoints
          eliminated
          user {
              id
          }
          sortedFour
          ...BestPossibleSmall_bracket
      }
  `, bracketKey)
  const finalFourTeams = bracket.sortedFour.map((slot) =>
    teams.find((team) => team.startingSlot === slot)
  )
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
              <BestPossibleSmall bracket={bracket} showEliminated={showEliminated} />
              <div className="final-four-teams">
                {finalFourTeams.map((team, i) => (
                  <FinalFourTeamSmall key={i} team={team} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SmallBracket;
