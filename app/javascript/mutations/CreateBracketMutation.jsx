import { graphql, commitMutation } from 'react-relay'
import currentRelay from '../lib/currentRelay'

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

// const configs = [
//   {
//     type: 'RANGE_ADD',
//     parentID: 'poolId',
//     connectionInfo: [
//       {
//         key: 'CreateBracket_brackets',
//         rangeBehavior: 'append',
//       },
//     ],
//     edgeName: 'bracketEdge',
//   },
// ]

function commit({ poolId, name, tieBreaker, gameDecisions }, onCompleted) {
  return commitMutation(currentRelay.environment, {
    mutation,
    onCompleted,
    // configs,
    variables: { input: { name, tieBreaker, gameDecisions: gameDecisions.toString() } },
  })
}

export const CreateBracketMutation = { commit }
export default { commit }
