import { graphql, commitMutation } from 'react-relay'
import { currentRelay } from 'lib/currentRelay'
import {
  CreateBracketMutation$variables,
  CreateBracketInput,
  CreateBracketMutation as CreateBracketMutationType,
  CreateBracketMutation$data,
} from '../RelayArtifacts/CreateBracketMutation.graphql'
import { PayloadError } from 'relay-runtime'

const mutation = graphql`
  mutation CreateBracketMutation($input: CreateBracketInput!) {
    createBracket(input: $input) {
      bracket {
        id
        ...EditBracket_bracket
      }

      errors {
        path
        message
      }
    }
  }
`

function commit(
  { name, gameDecisions }: CreateBracketInput,
  onCompleted: (response: CreateBracketMutation$data, errors: readonly PayloadError[]) => void
) {
  const variables: CreateBracketMutation$variables = { input: { name, gameDecisions } }
  return commitMutation<CreateBracketMutationType>(currentRelay, {
    mutation,
    onCompleted,
    variables,
  })
}

export const CreateBracketMutation = { commit }
