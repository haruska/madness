import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { BestPossible_bracket$data } from 'RelayArtifacts/BestPossible_bracket.graphql'
import { ordinalInNumber } from 'lib/ordinals'

const Component = ({
  showEliminated,
  bracket,
}: {
  showEliminated: boolean
  bracket: BestPossible_bracket$data
}) => {
  if (!showEliminated) {
    return null
  }

  return <td>{bracket.eliminated ? '-' : ordinalInNumber(bracket.bestPossibleFinish)}</td>
}

export const BestPossible = createFragmentContainer(Component, {
  bracket: graphql`
    fragment BestPossible_bracket on Bracket {
      bestPossibleFinish
      eliminated
    }
  `,
})
