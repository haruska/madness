import React, { Component } from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
export class BestPossible extends Component {
  render() {
    const { showEliminated, bracket } = this.props
    return showEliminated ? <td>{bracket.bestPossibleFinish}</td> : false
  }
}

export default createFragmentContainer(BestPossible, {
  bracket: graphql`
    fragment BestPossible_bracket on Bracket {
      bestPossibleFinish
    }
  `,
})
