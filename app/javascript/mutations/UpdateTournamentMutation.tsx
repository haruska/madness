import { graphql, commitMutation } from 'react-relay'
import { currentRelay } from 'lib/currentRelay'
import { PayloadError } from 'relay-runtime'
import {
  UpdateTournamentInput,
  UpdateTournamentMutation as UpdateTournamentMutationType,
  UpdateTournamentMutation$data,
} from '../RelayArtifacts/UpdateTournamentMutation.graphql'

const mutation = graphql`
  mutation UpdateTournamentMutation($input: UpdateTournamentInput!) {
    updateTournament(input: $input) {
      tournament {
        gameMask
        gameDecisions
      }
      errors {
        path
        message
      }
    }
  }
`

function commit(
  { gameDecisions, gameMask }: UpdateTournamentInput,
  onCompleted: (response: UpdateTournamentMutation$data, errors: readonly PayloadError[]) => void
) {
  return commitMutation<UpdateTournamentMutationType>(currentRelay, {
    mutation,
    onCompleted,
    variables: {
      input: { gameDecisions: gameDecisions.toString(), gameMask: gameMask.toString() },
    },
    optimisticResponse: {
      updateTournament: {
        tournament: {
          gameMask,
          gameDecisions,
        },
        errors: [],
      },
    },
  })
}

export const UpdateTournamentMutation = { commit }
