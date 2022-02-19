import React, { Component } from 'react'
import { Provider } from './AppContext'

class App extends Component {
  render() {
    const { router, children } = this.props
    return (
      <div className="app-container">
        <Provider value={{ router, setPageTitle: (title) => title }}>
          <div className="app-content">{children}</div>
        </Provider>
      </div>
    )
  }
}

export default App
