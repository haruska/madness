import React, { Component } from 'react'
import { BrowserProtocol, queryMiddleware } from 'farce'
import { createRender, createFarceRouter } from 'found'
import { Resolver } from 'found-relay'

import Routes from './Routes'
import currentRelay from 'lib/currentRelay'

import NotFound from 'containers/NotFound'

const FarceRouter = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: Routes,
  render: createRender({
    renderError: ({ error }) => <div>{error.status === 404 ? <NotFound /> : 'Error'}</div>,
  }),
})

export default class RelayRouter extends Component {
  subscription = null

  constructor(props) {
    super(props)

    this.state = {
      resolver: new Resolver(currentRelay.environment),
    }
  }

  handleEnvironmentReset = () => {
    this.setState({
      resolver: new Resolver(currentRelay.environment),
    })
  }

  componentWillMount() {
    this.subscription = currentRelay.subscribeToReset(this.handleEnvironmentReset)
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.stop()
    }
  }

  render() {
    return <FarceRouter resolver={this.state.resolver} />
  }
}
