import { graphql, commitMutation } from 'react-relay'
import { currentRelay } from 'lib/currentRelay'

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

function commit({ poolId, name, tieBreaker, gameDecisions }, onCompleted) {
  return commitMutation(currentRelay, {
    mutation,
    onCompleted,
    variables: { input: { name, tieBreaker, gameDecisions: gameDecisions.toString() } },
  })
}

export const CreateBracketMutation = { commit }
export default { commit }
