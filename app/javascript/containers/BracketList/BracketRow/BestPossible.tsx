import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { BestPossible_bracket$data } from 'RelayArtifacts/BestPossible_bracket.graphql'

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

  return <td>{bracket.eliminated ? '-' : bracket.bestPossibleFinish}</td>
}

export const BestPossible = createFragmentContainer(Component, {
  bracket: graphql`
    fragment BestPossible_bracket on Bracket {
      bestPossibleFinish
      eliminated
    }
  `,
})
