import { graphql, commitMutation } from 'react-relay'
import { currentRelay } from 'lib/currentRelay'

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
    type: 'NODE_DELETE',
    deletedIDFieldName: 'deletedBracketId',
  },
]

function commit(bracketId, onCompleted) {
  return commitMutation(currentRelay, {
    mutation,
    configs,
    onCompleted,
    variables: { input: { bracketId } },
  })
}

export const DeleteBracketMutation = { commit }
export default { commit }
