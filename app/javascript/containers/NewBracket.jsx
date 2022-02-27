import React, { Component } from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { AppContext } from '../AppContext'
import Dialog from '../components/Dialog'
import ErrorFlash from '../components/forms/ErrorFlash'
import Label from '../components/forms/Label'
import Tournament from '../components/Tournament'

import { CreateBracketMutation } from '../mutations/CreateBracketMutation'
import { COMPLETED_MASK } from './Bracket'

class NewBracket extends Component {
  static contextType = AppContext

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      gameDecisions: 0n,
      gameMask: 0n,
      tieBreaker: '',
      errors: null,
      showsDiscardDialog: false,
    }
  }

  componentWillMount() {
    this.context.setPageTitle('New Bracket')
  }

  componentWillUnmount() {
    this.context.setPageTitle()
  }

  handleSlotClick = (slotId, choice) => {
    let gameDecisions = this.state.gameDecisions
    let gameMask = this.state.gameMask

    const decision = choice - 1
    const position = BigInt(slotId)

    if (decision === 0) {
      gameDecisions &= ~(1n << position)
    } else {
      gameDecisions |= 1n << position
    }

    gameMask |= 1n << position

    this.setState({ gameDecisions, gameMask })
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handleTieBreakerChange = (event) => {
    const intValue = event.target.value ? parseInt(event.target.value, 10) : ''
    this.setState({ tieBreaker: intValue })
  }

  handleCreateCompleted = (response, errors) => {
    const allErrors = errors || response.createBracket.errors

    if (allErrors && allErrors.length !== 0) {
      this.setState({ errors: allErrors })
    } else {
      this.context.router.push(`/`)
    }
  }

  commitMutation = () => {
    const { name, tieBreaker, gameDecisions, gameMask } = this.state

    CreateBracketMutation.commit({ name, tieBreaker, gameDecisions }, this.handleCreateCompleted)
  }

  isFilledIn = () => this.state.gameMask === COMPLETED_MASK

  highlightMissingPicks = () => {
    //seems this is automatic?
  }

  handleDone = (event) => {
    event.preventDefault()

    if (this.isFilledIn()) {
      this.commitMutation()
    } else {
      this.highlightMissingPicks()
      this.setState({ errors: [{ path: ['base'], message: 'is not complete' }] })
    }
  }

  // cancel
  handleDiscard = () => {
    this.setState({ showsDiscardDialog: true })
  }

  handleCancelDiscard = () => {
    this.setState({ showsDiscardDialog: false })
  }

  handleConfirmDiscard = () => {
    this.setState({ showsDiscardDialog: false })
    this.context.router.push(`/`)
  }

  render() {
    const { name, gameDecisions, gameMask, tieBreaker, errors } = this.state
    const { tournament } = this.props.viewer

    const bracket = {
      name,
      tieBreaker,
      gameDecisions,
      gameMask,
    }

    return (
      <div className="new-bracket-container">
        <Dialog
          className="deletion"
          isOpen={this.state.showsDiscardDialog}
          message="You will lose your changes. Are you sure you want to proceed?"
          onConfirm={this.handleConfirmDiscard}
          onCancel={this.handleCancelDiscard}
        />
        <h2>New Bracket Entry</h2>
        <ErrorFlash errors={errors} objectType={'Bracket'} />
        <Tournament
          tournament={tournament}
          bracket={bracket}
          onSlotClick={this.handleSlotClick}
          highlightEmpty={!!this.state.errors}
          editing={true}
        />
        <form className="new-bracket-form" onSubmit={this.handleDone}>
          <Label attr="name" text="Bracket Name" errors={errors} />
          <input
            id="name"
            type="text"
            name="name"
            required
            value={this.state.name}
            onChange={this.handleNameChange}
          />

          <Label attr="tie_breaker" text="Tie Breaker" errors={errors} />
          <input
            id="tie_breaker"
            name="tie_breaker"
            required
            placeholder="Final Score of Championship Game Added Together (ex: 147)"
            type="number"
            value={this.state.tieBreaker}
            onChange={this.handleTieBreakerChange}
          />

          <input className="button left-button" type="submit" name="commit" value="Create" />
          <div className="button danger" onClick={this.handleDiscard}>
            Discard
          </div>
        </form>
      </div>
    )
  }
}

export default createFragmentContainer(NewBracket, {
  viewer: graphql`
    fragment NewBracket_viewer on Viewer {
      tournament: tournament64 {
        ...Tournament_tournament
      }
      currentUser {
        name
      }
    }
  `,
})
