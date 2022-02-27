import React, { Component } from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { AppContext } from '../AppContext'
import Dialog from 'components/Dialog'
import ErrorFlash from 'components/forms/ErrorFlash'
import Label from 'components/forms/Label'
import Tournament from 'components/Tournament'

import { UpdateBracketMutation } from 'mutations/UpdateBracketMutation'
import { DeleteBracketMutation } from 'mutations/DeleteBracketMutation'
import { COMPLETED_MASK } from './Bracket'

class EditBracket extends Component {
  static contextType = AppContext

  constructor(props) {
    super(props)
    this.state = {
      name: props.bracket.name,
      tieBreaker: props.bracket.tieBreaker || '0',
      gameDecisions: BigInt(props.bracket.gameDecisions),
      errors: null,
      showsDeletionDialog: false,
    }
  }

  bracket = () => {
    const { name, tieBreaker, gameDecisions } = this.state
    const { id } = this.props.bracket
    const gameMask = COMPLETED_MASK

    return {
      id,
      name,
      tieBreaker,
      gameDecisions,
      gameMask,
    }
  }

  componentWillMount() {
    this.context.setPageTitle('Editing Bracket')
  }

  componentWillUnmount() {
    this.context.setPageTitle()
  }

  handleSlotClick = (slotId, choice) => {
    let gameDecisions = this.state.gameDecisions

    const decision = choice - 1
    const position = BigInt(slotId)

    if (decision === 0) {
      gameDecisions &= ~(1n << position)
    } else {
      gameDecisions |= 1n << position
    }

    this.setState({ gameDecisions })
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handleTieBreakerChange = (event) => {
    const intValue = event.target.value ? parseInt(event.target.value, 10) : ''
    this.setState({ tieBreaker: intValue })
  }

  handleUpdateCompleted = (response, errors) => {
    const allErrors = errors || response.updateBracket.errors

    if (allErrors?.length !== 0) {
      this.setState({ errors: allErrors })
    } else {
      this.context.router.push(`/brackets/${response.updateBracket.bracket.id}`)
    }
  }

  handleDeletionCompleted = (response, errors) => {
    if (errors && errors.length !== 0) {
      console.error(`commit failed: ${errors}`) // eslint-disable-line
    } else {
      this.context.router.push(`/`)
    }
  }

  handleDone = (event) => {
    event.preventDefault()

    const { bracket } = this.props
    const { name, tieBreaker, gameDecisions } = this.state
    const bracketId = bracket.id

    UpdateBracketMutation.commit(
      { bracketId, name, tieBreaker, gameDecisions },
      this.handleUpdateCompleted
    )
  }

  // deletion
  handleDelete = () => {
    this.setState({ showsDeletionDialog: true })
  }

  handleCancelDeletion = () => {
    this.setState({ showsDeletionDialog: false })
  }

  handleConfirmDeletion = () => {
    this.setState({ showsDeletionDialog: false })
    DeleteBracketMutation.commit(this.props.bracket.id, this.handleDeletionCompleted)
  }

  shouldComponentUpdate(nextProps) {
    return !!nextProps.bracket
  }

  render() {
    const { errors } = this.state
    const bracket = this.bracket()
    const policy = this.props.bracket.policy

    return (
      <div className="edit-bracket-container">
        <Dialog
          className="deletion"
          isOpen={this.state.showsDeletionDialog}
          message="This will delete this bracket. Are you sure you want to proceed?"
          onConfirm={this.handleConfirmDeletion}
          onCancel={this.handleCancelDeletion}
        />
        <h2>Editing Bracket</h2>
        <Tournament bracket={bracket} onSlotClick={this.handleSlotClick} editing={true} />
        <form className="edit-bracket-form" onSubmit={this.handleDone}>
          <ErrorFlash errors={errors} objectType={'Bracket'} />
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

          <input className="button left-button" type="submit" name="commit" value="Done" />
          {policy.destroy ? (
            <div className="button danger" onClick={this.handleDelete}>
              Delete Bracket
            </div>
          ) : null}
        </form>
      </div>
    )
  }
}

export default createFragmentContainer(EditBracket, {
  bracket: graphql`
    fragment EditBracket_bracket on Bracket {
      id
      name
      tieBreaker
      gameDecisions
      policy {
        destroy
      }
      user {
        name
      }
    }
  `,
})
