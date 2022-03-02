import React from 'react'

export const TieBreaker = ({
  tieBreaker,
  editing,
}: {
  tieBreaker: number | ''
  editing?: boolean
}) => {
  if (tieBreaker && !editing) {
    return <div className="tie-breaker">Tie Breaker: {tieBreaker}</div>
  }
  return null
}
