import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import { EventEmitter } from 'events'

export const ENV_RESET_EVENT = 'environment_reset'

function fetchQuery(operation, variables) {
  const headers = {
    'Content-Type': 'application/json',
  }

  const jwt = localStorage.getItem('id_token')

  if (jwt) {
    headers['Authorization'] = `Bearer ${jwt}`
  }

  return fetch(process.env.REACT_APP_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

class CurrentRelay extends EventEmitter {
  environment

  constructor() {
    super()
    this.reset()
  }

  subscribe(event, handler) {
    this.on(event, handler)

    return {
      stop: () => this.removeListener(event, handler),
    }
  }

  subscribeToReset(handler) {
    return this.subscribe(ENV_RESET_EVENT, handler)
  }

  reset() {
    const store = new Store(new RecordSource())
    const network = Network.create(fetchQuery)

    this.environment = new Environment({ network, store })
    this.emit(ENV_RESET_EVENT)
  }
}

const currentRelay = new CurrentRelay()
export default currentRelay
