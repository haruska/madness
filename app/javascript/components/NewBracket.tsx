import React, { ChangeEvent, useState } from 'react'
import { Dialog } from 'components/Dialog'
import { ErrorFlash } from 'components/forms/ErrorFlash'
import { Label } from 'components/forms/Label'
import { Tournament } from 'components/Tournament'

import { BasicBracket, COMPLETED_MASK } from 'components/BasicBracket'
import { Team, Tournament as ITournament } from 'TournamentTypes'

export const NewBracket = ({
  tournament,
  teams,
}: {
  tournament: ITournament
  teams: readonly Team[]
}) => {
  const [name, setName] = useState('')
  const [gameDecisionsMask, setGameDecisionsMask] = useState<[bigint, bigint]>([0n, 0n])
  // const [errors, setErrors] = useState<MutationErrors>(null)
  const [showDiscardDialog, setShowDiscardDialog] = useState(false)

  const [gameDecisions, gameMask] = gameDecisionsMask

  const bracket: BasicBracket = {
    name,
    gameDecisions,
    gameMask,
  }

  const handleSlotClick = (slotId: number, choice: number) => {
    const decision = choice - 1
    const position = BigInt(slotId)

    let [decisions, mask] = gameDecisionsMask

    if (decision === 0) {
      decisions &= ~(1n << position)
    } else {
      decisions |= 1n << position
    }

    mask |= 1n << position

    setGameDecisionsMask([decisions, mask])
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  // const handleCreateCompleted = (response: CreateBracketMutation$data, errors: MutationErrors) => {
  //   const allErrors = errors || response.createBracket.errors
  //
  //   if (allErrors && allErrors.length !== 0) {
  //     setErrors(allErrors)
  //   } else {
  //     window.location.href = '/'
  //   }
  // }
  //
  // const commitMutation = () => {
  //   CreateBracketMutation.commit(
  //     { name, gameDecisions: gameDecisions.toString() },
  //     handleCreateCompleted
  //   )
  // }

  const isFilledIn = () => gameMask === COMPLETED_MASK

  const highlightMissingPicks = () => {
    //seems this is automatic?
  }

  const handleDone = (event) => {
    event.preventDefault()

    if (isFilledIn()) {
      // commitMutation()
    } else {
      highlightMissingPicks()
      // setErrors([{ path: ['base'], message: 'is not complete' }])
    }
  }

  // cancel
  const handleDiscard = () => {
    setShowDiscardDialog(true)
  }

  const handleCancelDiscard = () => {
    setShowDiscardDialog(false)
  }

  const handleConfirmDiscard = () => {
    setShowDiscardDialog(false)
    window.location.href = '/'
  }

  return (
    <div className="new-bracket-container">
      <Dialog
        isOpen={showDiscardDialog}
        message="You will lose your changes. Are you sure you want to proceed?"
        onConfirm={handleConfirmDiscard}
        onCancel={handleCancelDiscard}
      />
      <h2>New Bracket Entry</h2>
      {/*{errors ? <ErrorFlash errors={errors} objectType={'Bracket'} /> : null}*/}
      <Tournament
        tournament={tournament}
        teams={teams}
        bracket={bracket}
        onSlotClick={handleSlotClick}
        highlightEmpty={false /*!!errors*/}
      />
      <form className="new-bracket-form" onSubmit={handleDone}>
        {/*<Label attr="name" text="Bracket Name" errors={errors} />*/}
        <input
          id="name"
          type="text"
          name="name"
          required
          value={name}
          onChange={handleNameChange}
        />

        <input className="button left-button" type="submit" name="commit" value="Create" />
        <div className="button danger" onClick={handleDiscard}>
          Discard
        </div>
      </form>
    </div>
  )
}
