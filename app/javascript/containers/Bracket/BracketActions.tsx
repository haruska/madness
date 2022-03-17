import React, { useContext } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import classNames from 'classnames'
import { Link } from 'found'
import { BracketActions_bracket$data } from 'RelayArtifacts/BracketActions_bracket.graphql'
import { AppContext } from 'AppContext'

const Component = ({ bracket }: { bracket: BracketActions_bracket$data }) => {
  const { tournament } = useContext(AppContext)
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

export const BracketActions = createFragmentContainer(Component, {
  bracket: graphql`
    fragment BracketActions_bracket on Bracket {
      id
      policy {
        update
      }
    }
  `,
})
