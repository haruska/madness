import { graphql, commitMutation } from 'react-relay'
import currentRelay from '../lib/currentRelay'

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

function commit({ name, tieBreaker, gameDecisions, bracketId }, onCompleted) {
  return commitMutation(currentRelay.environment, {
    mutation,
    onCompleted,
    variables: { input: { name, tieBreaker, gameDecisions: gameDecisions.toString(), bracketId } },
    optimisticResponse: {
      updateBracket: {
        bracket: {
          id: bracketId,
          name,
          tieBreaker,
          gameDecisions: gameDecisions.toString(),
        },
        errors: [],
      },
    },
  })
}

export const UpdateBracketMutation = { commit }
export default { commit }
