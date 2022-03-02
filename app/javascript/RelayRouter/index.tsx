import React from 'react'
import { BrowserProtocol, queryMiddleware } from 'farce'
import { createRender, createFarceRouter } from 'found'
import { Resolver } from 'found-relay'

import Routes from './Routes'
import { currentRelay } from 'lib/currentRelay'

import { NotFound } from 'containers/NotFound'

const FarceRouter = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: Routes,
  render: createRender({
    renderError: ({ error }) => <div>{error.status === 404 ? <NotFound /> : 'Error'}</div>,
  }),
})

export const RelayRouter = () => {
  const resolver = new Resolver(currentRelay)

  return <FarceRouter resolver={resolver} />
}
