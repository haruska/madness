import { graphql, commitMutation } from 'react-relay'
import { currentRelay } from 'lib/currentRelay'
import {
  UpdateBracketInput,
  UpdateBracketMutation as UpdateBracketMutationType,
  UpdateBracketMutation$data,
} from 'RelayArtifacts/UpdateBracketMutation.graphql'
import { PayloadError } from 'relay-runtime'

const mutation = graphql`
  mutation UpdateBracketMutation($input: UpdateBracketInput!) {
    updateBracket(input: $input) {
      bracket {
        id
        name
        tieBreaker
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
  { name, tieBreaker, gameDecisions, bracketId }: UpdateBracketInput,
  onCompleted: (response: UpdateBracketMutation$data, errors: readonly PayloadError[]) => void
) {
  return commitMutation<UpdateBracketMutationType>(currentRelay, {
    mutation,
    onCompleted,
    variables: { input: { name, tieBreaker, gameDecisions: gameDecisions.toString(), bracketId } },
    optimisticResponse: {
      updateBracket: {
        bracket: {
          id: bracketId,
          name,
          tieBreaker,
          gameDecisions,
        },
        errors: [],
      },
    },
  })
}

export const UpdateBracketMutation = { commit }
