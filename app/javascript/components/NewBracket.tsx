import React, { ChangeEvent, useState } from 'react'
import { Dialog } from 'components/Dialog'
import { ErrorFlash } from 'components/forms/ErrorFlash'
import { Label } from 'components/forms/Label'
import { Tournament } from 'components/Tournament'

import { BasicBracket, COMPLETED_MASK } from 'components/BasicBracket'
import { Team, Tournament as ITournament } from 'objects/TournamentTypes'

export interface HashMap<T> {
  [key: string]: T
}

export type BracketErrors = HashMap<string[]>

export const NewBracket = ({
  tournament,
  teams,
}: {
  tournament: ITournament
  teams: readonly Team[]
}) => {
  const [name, setName] = useState('')
  const [gameDecisionsMask, setGameDecisionsMask] = useState<[bigint, bigint]>([0n, 0n])
  const [errors, setErrors] = useState<BracketErrors>({})
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
  const isFilledIn = () => gameMask === COMPLETED_MASK

  const highlightMissingPicks = () => {
    //seems this is automatic?
  }

  const handleDone = (event) => {
    if (!isFilledIn()) {
      event.preventDefault()
      highlightMissingPicks()
      setErrors({ base: ['is not complete'] })
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

  const authenticityToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content')

  return (
    <>
      <Dialog
        isOpen={showDiscardDialog}
        message="You will lose your changes. Are you sure you want to proceed?"
        onConfirm={handleConfirmDiscard}
        onCancel={handleCancelDiscard}
      />
      {errors && Object.keys(errors).length !== 0 ? (
        <ErrorFlash errors={errors} objectType={'Bracket'} />
      ) : null}
      <Tournament
        tournament={tournament}
        teams={teams}
        bracket={bracket}
        onSlotClick={handleSlotClick}
        highlightEmpty={!!errors}
      />
      <form className="new-bracket-form" action="/brackets" method="POST" onSubmit={handleDone}>
        <input name="authenticity_token" type="hidden" value={authenticityToken} />
        <input name="bracket[game_decisions]" type="hidden" value={gameDecisions.toString()} />
        <Label attr="name" text="Bracket Name" errors={errors} />
        <input
          id="name"
          type="text"
          name="bracket[name]"
          required
          value={name}
          onChange={handleNameChange}
        />

        <input className="button left-button" type="submit" name="commit" value="Create" />
        <div className="button danger" onClick={handleDiscard}>
          Discard
        </div>
      </form>
    </>
  )
}
