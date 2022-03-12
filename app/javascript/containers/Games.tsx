import React, { useContext } from 'react'
import { Tournament } from 'components/Tournament'
import { Link } from 'found'
import classNames from 'classnames'
import { AppContext } from '../AppContext'
import { BracketActions } from './Bracket/BracketActions'

const Actions = () => {
  const { tournament } = useContext(AppContext)
  if (tournament.policy.update) {
    return (
      <div className="tournament-actions">
        <Link to={`/tournament/edit`} className={classNames('button', 'edit')}>
          Edit Tournament
        </Link>
      </div>
    )
  }
  return null
}

export const Games = () => {
  return (
    <div className="games-container">
      <div className="games-heading">
        <h2>Game Results</h2>
        <div>
          <Actions />
        </div>
      </div>
      <Tournament />
    </div>
  )
}
