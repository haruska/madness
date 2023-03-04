import React from 'react'
import { graphql, useFragment } from 'react-relay'
import { BestPossibleSmall_bracket$key } from 'RelayArtifacts/BestPossibleSmall_bracket.graphql'
import { ordinalInNumber } from 'lib/ordinals'

export const BestPossibleSmall = ({
  showEliminated,
  bracket: bracketKey,
}: {
  showEliminated: boolean
  bracket: BestPossibleSmall_bracket$key
}) => {
  const bracket = useFragment(graphql`
      fragment BestPossibleSmall_bracket on Bracket {
          bestPossibleFinish
          eliminated
      }
  `, bracketKey)

  if (showEliminated) {
    let bestPossible = bracket.eliminated
      ? 'eliminated'
      : `possible ${ordinalInNumber(bracket.bestPossibleFinish)} place finish`
    return <div className="best-possible">{bestPossible}</div>
  } else {
    return null
  }
}

