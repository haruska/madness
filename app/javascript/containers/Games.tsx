import React from 'react'
import { Tournament } from 'components/Tournament'

export const Games = () => {
  return (
    <div className="games-container">
      <h2>Game Results</h2>
      <Tournament />
    </div>
  )
}