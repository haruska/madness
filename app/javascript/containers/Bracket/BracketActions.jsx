import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import classNames from 'classnames'
import { Link } from 'found'

class BracketActions extends Component {
  render() {
    const { bracket } = this.props

    if (bracket.policy.update) {
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
}

export default createFragmentContainer(BracketActions, {
  bracket: graphql`
    fragment BracketActions_bracket on Bracket {
      id
      policy {
        update
      }
    }
  `,
})
