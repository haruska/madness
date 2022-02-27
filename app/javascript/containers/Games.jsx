import React, { Component } from 'react'
import Tournament from 'components/Tournament'

export default class Games extends Component {
  render() {
    return (
      <div className="games-container">
        <h2>Game Results</h2>
        <Tournament />
      </div>
    )
  }
}
