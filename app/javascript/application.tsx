import React from 'react'
import ReactDOM from 'react-dom'
import { RelayRouter } from 'RelayRouter'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

const SENTRY_DSN = document.getElementsByName('sentry-dsn')[0]?.attributes['content']?.value

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  })
}

ReactDOM.render(<RelayRouter />, document.getElementById('root'))
