import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from 'relay-runtime'

const csrfToken = (): string => {
  const tokenElement = document.getElementsByName('csrf-token')[0]
  return tokenElement.attributes['content'].value
}

async function fetchQuery(request: RequestParameters, variables: Variables) {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken(),
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  })

  return await response.json()
}

export const currentRelay = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})
