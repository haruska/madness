import { graphql, commitMutation } from 'react-relay'
import { currentRelay } from 'lib/currentRelay'
import {
  DeleteBracketMutation as DeleteBracketMutationType,
  DeleteBracketMutation$data,
} from 'RelayArtifacts/DeleteBracketMutation.graphql'
import { PayloadError } from 'relay-runtime'

const mutation = graphql`
  mutation DeleteBracketMutation($input: DeleteBracketInput!) {
    deleteBracket(input: $input) {
      deletedBracketId
      errors {
        path
        message
      }
    }
  }
`

const configs = [
  {
    type: 'NODE_DELETE' as const,
    deletedIDFieldName: 'deletedBracketId',
  },
]

function commit(
  bracketId: string,
  onCompleted: (response: DeleteBracketMutation$data, errors: readonly PayloadError[]) => void
) {
  return commitMutation<DeleteBracketMutationType>(currentRelay, {
    mutation,
    configs,
    onCompleted,
    variables: { input: { bracketId } },
  })
}

export const DeleteBracketMutation = { commit }
