import React, { Component } from 'react'
import { graphql, createFragmentContainer } from 'react-relay'

export class BestPossibleSmall extends Component {
  render() {
    const { showEliminated, bracket } = this.props

    if (showEliminated) {
      let bestPossible = bracket.eliminated
        ? 'eliminated'
        : `possible ${bracket.bestPossibleFinish} place finish`
      return <div className="best-possible">{bestPossible}</div>
    } else {
      return false
    }
  }
}

export default createFragmentContainer(BestPossibleSmall, {
  bracket: graphql`
    fragment BestPossibleSmall_bracket on Bracket {
      bestPossibleFinish
      eliminated
    }
  `,
})
