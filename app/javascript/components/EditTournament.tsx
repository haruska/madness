import React, { useState } from 'react'
import { Team, Tournament as ITournament } from 'objects/TournamentTypes'
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

  // cancel
  const handleDiscard = () => {
    setShowDiscardDialog(true)
  }

  const handleCancelDiscard = () => {
    setShowDiscardDialog(false)
  }

  const handleConfirmDiscard = () => {
    setShowDiscardDialog(false)
    window.location.href = '/tournament'
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

      <form className="edit-tournament-form" action="/tournament" method="POST">
        <input name="_method" type="hidden" value="put" />
        <input name="authenticity_token" type="hidden" value={authenticityToken} />
        <input name="torunament[game_decisions]" type="hidden" value={gameDecisions.toString()} />
        <input name="tournament[game_mask]" type="hidden" value={gameMask.toString()} />
        <input className="button left-button" type="submit" name="commit" value="Done" />
        <div className="button danger" onClick={handleDiscard}>
          Discard
        </div>
      </form>
    </>
  )
}
