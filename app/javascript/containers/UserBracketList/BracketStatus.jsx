import React, { Component } from 'react'

export default class BracketStatus extends Component {
  render() {
    const { paid } = this.props

    if (paid) {
      return <span className="badge-success">OK</span>
    }

    return <span className="badge-alert">Unpaid</span>
  }
}
