import React from 'react'
import { graphql, useFragment } from 'react-relay'
import { BestPossible_bracket$key } from 'RelayArtifacts/BestPossible_bracket.graphql'
import { ordinalInNumber } from 'lib/ordinals'

export const BestPossible = ({
  showEliminated,
  bracket: bracket_key,
}: {
  showEliminated: boolean
  bracket: BestPossible_bracket$key
}) => {
  const bracket = useFragment(
    graphql`
        fragment BestPossible_bracket on Bracket {
            bestPossibleFinish
            eliminated
        }
    `,
    bracket_key
  )

  if (!showEliminated) {
    return null
  }

  return <td>{bracket.eliminated ? '-' : ordinalInNumber(bracket.bestPossibleFinish)}</td>
}
