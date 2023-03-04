import React, { useContext } from 'react'
import { useFragment, graphql } from 'react-relay'
import classNames from 'classnames'
import { Link } from 'found'
import { AppContext } from 'AppContext'
import type {BracketActions_bracket$key} from 'RelayArtifacts/BracketActions_bracket.graphql'

export const BracketActions = (props: { bracket: BracketActions_bracket$key }) => {
  const { tournament } = useContext(AppContext)
  const bracket = useFragment(
    graphql`
             fragment BracketActions_bracket on Bracket {
               id
               policy {
                 update
               }
             }
    `,
    props.bracket
  )
  if (bracket.policy.update && !tournament.started) {
    return (
      <div className="bracket-actions">
        <Link to={`/brackets/${bracket.id}/edit`} className={classNames('button', 'edit')}>
          Edit Bracket
        </Link>
      </div>
    )
  }
  return null
}

