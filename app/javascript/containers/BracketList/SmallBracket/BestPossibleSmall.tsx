import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { BestPossibleSmall_bracket$data } from 'RelayArtifacts/BestPossibleSmall_bracket.graphql'
import { ordinalInNumber } from 'lib/ordinals'

const Component = ({
  showEliminated,
  bracket,
}: {
  showEliminated: boolean
  bracket: BestPossibleSmall_bracket$data
}) => {
  if (showEliminated) {
    let bestPossible = bracket.eliminated
      ? 'eliminated'
      : `possible ${ordinalInNumber(bracket.bestPossibleFinish)} place finish`
    return <div className="best-possible">{bestPossible}</div>
  } else {
    return null
  }
}

export const BestPossibleSmall = createFragmentContainer(Component, {
  bracket: graphql`
    fragment BestPossibleSmall_bracket on Bracket {
      bestPossibleFinish
      eliminated
    }
  `,
})
