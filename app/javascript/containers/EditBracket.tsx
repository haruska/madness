import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { AppContext } from 'AppContext'
import { Dialog } from 'components/Dialog'
import { ErrorFlash } from 'components/forms/ErrorFlash'
import { Label } from 'components/forms/Label'
import { Tournament } from 'components/Tournament'

import { UpdateBracketMutation } from 'mutations/UpdateBracketMutation'
import { DeleteBracketMutation } from 'mutations/DeleteBracketMutation'
import { COMPLETED_MASK } from './Bracket'
import { EditBracket_bracket$data } from 'RelayArtifacts/EditBracket_bracket.graphql'
import { DEFAULT_TITLE } from 'components/Layouts/MainLayout'
import { UpdateBracketMutation$data } from 'RelayArtifacts/UpdateBracketMutation.graphql'
import { MutationErrors } from './NewBracket'
import { DeleteBracketMutation$data } from 'RelayArtifacts/DeleteBracketMutation.graphql'

const Component = ({ bracket }: { bracket: EditBracket_bracket$data }) => {
  const { setPageTitle, router } = useContext(AppContext)
  const [name, setName] = useState(bracket?.name || '')
  const [gameDecisions, setGameDecisions] = useState(BigInt(bracket?.gameDecisions || 0))
  const [errors, setErrors] = useState(null)
  const [showDeletionDialog, setShowDeletionDialog] = useState(false)

  const policy = bracket?.policy

  useEffect(() => {
    setPageTitle('Editing Bracket')

    return () => setPageTitle(DEFAULT_TITLE)
  })

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

  const handleUpdateCompleted = (response: UpdateBracketMutation$data, errors: MutationErrors) => {
    const allErrors = errors || response.updateBracket.errors

    if (allErrors?.length !== 0) {
      setErrors(allErrors)
    } else {
      router.push(`/brackets/${response.updateBracket.bracket.id}`)
    }
  }

  const handleDeletionCompleted = (
    response: DeleteBracketMutation$data,
    errors: MutationErrors
  ) => {
    if (errors && errors.length !== 0) {
      console.error(`commit failed: ${errors}`) // eslint-disable-line
    } else {
      router.push(`/`)
    }
  }

  const handleDone = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    UpdateBracketMutation.commit(
      {
        bracketId: bracket.id,
        name,
        gameDecisions: gameDecisions.toString(),
      },
      handleUpdateCompleted
    )
  }

  return (
    <div className="edit-bracket-container">
      <Dialog
        isOpen={showDeletionDialog}
        message="This will delete this bracket. Are you sure you want to proceed?"
        onConfirm={() => {
          setShowDeletionDialog(false)
          DeleteBracketMutation.commit(bracket.id, handleDeletionCompleted)
        }}
        onCancel={() => setShowDeletionDialog(false)}
      />
      <h2>Editing Bracket</h2>
      <Tournament
        bracket={{
          ...bracket,
          name,
          gameDecisions,
          gameMask: COMPLETED_MASK,
        }}
        onSlotClick={handleSlotClick}
      />
      <form className="edit-bracket-form" onSubmit={handleDone}>
        {errors ? <ErrorFlash errors={errors} objectType={'Bracket'} /> : null}
        <Label attr="name" text="Bracket Name" errors={errors} />
        <input
          id="name"
          type="text"
          name="name"
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
    </div>
  )
}

export const EditBracket = createFragmentContainer(Component, {
  bracket: graphql`
    fragment EditBracket_bracket on Bracket {
      id
      name
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
