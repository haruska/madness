import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { AppContext } from 'AppContext'
import Dialog from 'components/Dialog'
import { ErrorFlash } from 'components/forms/ErrorFlash'
import Label from 'components/forms/Label'
import { Tournament } from 'components/Tournament'

import { CreateBracketMutation } from 'mutations/CreateBracketMutation'
import { BasicBracket, COMPLETED_MASK } from './Bracket'
import { DEFAULT_TITLE } from '../components/Layouts/MainLayout'
import { CreateBracketMutation$data } from '../RelayArtifacts/CreateBracketMutation.graphql'

export type MutationErrors = CreateBracketMutation$data['createBracket']['errors']
export type MutationError = MutationErrors[0]

export const NewBracket = () => {
  const { setPageTitle, router } = useContext(AppContext)

  const [name, setName] = useState('')
  const [gameDecisionsMask, setGameDecisionsMask] = useState<[bigint, bigint]>([0n, 0n])
  const [tieBreaker, setTieBreaker] = useState<number | ''>('')
  const [errors, setErrors] = useState<MutationErrors>(null)
  const [showDiscardDialog, setShowDiscardDialog] = useState(false)

  useEffect(() => {
    setPageTitle('New Bracket')
    return () => {
      setPageTitle(DEFAULT_TITLE)
    }
  })

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

  const handleTieBreakerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const intValue = event.target.value ? parseInt(event.target.value, 10) : ''
    setTieBreaker(intValue)
  }

  const handleCreateCompleted = (response: CreateBracketMutation$data, errors: MutationErrors) => {
    const allErrors = errors || response.createBracket.errors

    if (allErrors && allErrors.length !== 0) {
      setErrors(allErrors)
    } else {
      router.push(`/`)
    }
  }

  const commitMutation = () => {
    CreateBracketMutation.commit(
      { name, tieBreaker, gameDecisions: gameDecisionsMask[0] },
      handleCreateCompleted
    )
  }

  const isFilledIn = () => gameDecisionsMask[1] === COMPLETED_MASK

  const highlightMissingPicks = () => {
    //seems this is automatic?
  }

  const handleDone = (event) => {
    event.preventDefault()

    if (isFilledIn()) {
      commitMutation()
    } else {
      highlightMissingPicks()
      setErrors([{ path: ['base'], message: 'is not complete' }])
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
    router.push(`/`)
  }

  const [gameDecisions, gameMask] = gameDecisionsMask
  const coercedTiebreaker = tieBreaker === '' ? 0 : tieBreaker

  const bracket: BasicBracket = {
    name,
    tieBreaker: coercedTiebreaker,
    gameDecisions,
    gameMask,
  }

  return (
    <div className="new-bracket-container">
      <Dialog
        className="deletion"
        isOpen={showDiscardDialog}
        message="You will lose your changes. Are you sure you want to proceed?"
        onConfirm={handleConfirmDiscard}
        onCancel={handleCancelDiscard}
      />
      <h2>New Bracket Entry</h2>
      {errors ? <ErrorFlash errors={errors} objectType={'Bracket'} /> : null}
      <Tournament
        bracket={bracket}
        onSlotClick={handleSlotClick}
        highlightEmpty={!!errors}
        editing={true}
      />
      <form className="new-bracket-form" onSubmit={handleDone}>
        <Label attr="name" text="Bracket Name" errors={errors} />
        <input
          id="name"
          type="text"
          name="name"
          required
          value={name}
          onChange={handleNameChange}
        />

        <Label attr="tie_breaker" text="Tie Breaker" errors={errors} />
        <input
          id="tie_breaker"
          name="tie_breaker"
          required
          placeholder="Final Score of Championship Game Added Together (ex: 147)"
          type="number"
          value={tieBreaker}
          onChange={handleTieBreakerChange}
        />

        <input className="button left-button" type="submit" name="commit" value="Create" />
        <div className="button danger" onClick={handleDiscard}>
          Discard
        </div>
      </form>
    </div>
  )
}
