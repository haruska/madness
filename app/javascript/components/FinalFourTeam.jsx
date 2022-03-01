import React, { Component } from 'react'

export default class FinalFourTeam extends Component {
  render() {
    const { team } = this.props
    return <td key={team.id}>{team.name}</td>
  }
}
