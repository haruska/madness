import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { AppContext } from '../../AppContext'

export default class NewBracketButton extends Component {
  static contextType = AppContext

  handleCreate = () => {
    this.context.router.push(`/new_bracket`)
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { bracketCount } = this.props

    if (bracketCount > 0) {
      return (
        <button className="minor" onClick={this.handleCreate}>
          Another Bracket Entry
        </button>
      )
    } else {
      return <button onClick={this.handleCreate}>New Bracket Entry</button>
    }
  }
}
