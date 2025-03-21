import React, { useState } from 'react'
import { Dialog } from 'components/Dialog'
import { ErrorFlash } from 'components/forms/ErrorFlash'
import { Label } from 'components/forms/Label'
import { Tournament } from 'components/Tournament'

import { COMPLETED_MASK } from 'components/BasicBracket'
import { Team, Bracket, Tournament as ITournament } from '../objects/TournamentTypes'
import { BracketErrors } from './NewBracket'

export const EditBracket = ({
                              bracket,
                              errors,
                              tournament,
                              teams,
                            }: {
  bracket: Bracket
  errors?: BracketErrors
  tournament: ITournament
  teams: readonly Team[]
}) => {
  const [name, setName] = useState(bracket?.name || '')
  const [gameDecisions, setGameDecisions] = useState(BigInt(bracket?.gameDecisions || 0))
  const [showDeletionDialog, setShowDeletionDialog] = useState(false)

  const policy = bracket?.policy
  const handleSlotClick = (slotId: number, choice: number) => {
    let decisions = gameDecisions

    const decision = choice - 1
    const position = BigInt(slotId)

    if (decision === 0) {
      decisions &= ~(1n << position)
    } else {
      decisions |= 1n << position
    }

    setGameDecisions(decisions)
  }

  const performDelete = async () => {
    const reqOpts = {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': authenticityToken,
      },
    }

    const response = await fetch(`/brackets/${bracket.id}`, reqOpts)

    if (!response.ok) {
      alert('Delete Failed')
    } else {
      window.location.href = '/'
    }
  }

  const authenticityToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content')

  return (
    <>
      <Dialog
        isOpen={showDeletionDialog}
        message="This will delete this bracket. Are you sure you want to proceed?"
        onConfirm={async () => {
          setShowDeletionDialog(false)
          await performDelete()
        }}
        onCancel={() => setShowDeletionDialog(false)}
      />
      {errors && Object.keys(errors).length !== 0 ? (
        <ErrorFlash errors={errors} objectType={'Bracket'} />
      ) : null}
      <Tournament
        bracket={{
          ...bracket,
          name,
          gameDecisions,
          gameMask: COMPLETED_MASK,
        }}
        tournament={tournament}
        teams={teams}
        onSlotClick={handleSlotClick}
      />
      <form className="edit-bracket-form" action={`/brackets/${bracket.id}`} method="POST">
        <input type="hidden" name="_method" value="PUT" />
        <input name="authenticity_token" type="hidden" value={authenticityToken} />
        <input name="bracket[game_decisions]" type="hidden" value={gameDecisions.toString()} />
        <Label attr="name" text="Bracket Name" errors={errors} />
        <input
          id="name"
          type="text"
          name="bracket[name]"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input className="button left-button" type="submit" name="commit" value="Done" />
        {policy?.destroy ? (
          <div className="button danger" onClick={() => setShowDeletionDialog(true)}>
            Delete Bracket
          </div>
        ) : null}
      </form>
    </>
  )
}
