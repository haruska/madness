import React, { FormEvent, useState } from 'react'
import { Team, Tournament as ITournament } from 'objects/TournamentTypes'
import { ErrorFlash } from 'components/forms/ErrorFlash'
import { Tournament } from 'components/Tournament'
import { Dialog } from 'components/Dialog'

export const EditTournament = ({
  tournament,
  teams,
}: {
  tournament: ITournament
  teams: readonly Team[]
}) => {
  const [gameDecisionsMask, setGameDecisionsMask] = useState([
    BigInt(tournament.gameDecisions),
    BigInt(tournament.gameMask),
  ])
  const [errors, setErrors] = useState(null)
  const [showDiscardDialog, setShowDiscardDialog] = useState(false)

  const [gameDecisions, gameMask] = gameDecisionsMask

  const handleSlotClick = (slotId: number, choice: number) => {
    let decisions = gameDecisions

    const decision = choice - 1
    const position = BigInt(slotId)

    if (decision === 0) {
      decisions &= ~(1n << position)
    } else {
      decisions |= 1n << position
    }

    const mask = gameMask | (BigInt(1) << position)

    setGameDecisionsMask([decisions, mask])
  }

  // const handleUpdateCompleted = (
  //   response: UpdateTournamentMutation$data,
  //   errors: MutationErrors
  // ) => {
  //   const allErrors = errors || response.updateTournament.errors
  //   if (allErrors?.length !== 0) {
  //     setErrors(allErrors)
  //   } else {
  //     window.location.href = '/'
  //   }
  // }

  const handleDone = (event: FormEvent<HTMLFormElement>) => {
    //   event.preventDefault()
    //   UpdateTournamentMutation.commit(
    //     {
    //       gameMask: gameMask.toString(),
    //       gameDecisions: gameDecisions.toString(),
    //     },
    //     handleUpdateCompleted
    //   )
    window.location.href = '/'
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
    <div className="edit-tournament-container">
      <Dialog
        isOpen={showDiscardDialog}
        message="You will lose your changes. Are you sure you want to proceed?"
        onConfirm={handleConfirmDiscard}
        onCancel={handleCancelDiscard}
      />
      <h2>Editing Tournament</h2>
      <Tournament
        bracket={{
          name: 'tournament',
          gameMask,
          gameDecisions,
        }}
        tournament={tournament}
        teams={teams}
        onSlotClick={handleSlotClick}
      />
      <form className="edit-tournament-form" onSubmit={handleDone}>
        {errors ? <ErrorFlash errors={errors} objectType={'Tournament'} /> : null}
        <input className="button left-button" type="submit" name="commit" value="Done" />
        <div className="button danger" onClick={handleDiscard}>
          Discard
        </div>
      </form>
    </div>
  )
}
