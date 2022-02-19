import React, { Component } from 'react'
import { any, bool } from 'prop-types'

export default class TieBreaker extends Component {
  static propTypes = {
    tieBreaker: any,
    editing: bool,
  }

  render() {
    if (this.props.tieBreaker && !this.props.editing) {
      return <div className="tie-breaker">Tie Breaker: {this.props.tieBreaker}</div>
    }
    return null
  }
}
