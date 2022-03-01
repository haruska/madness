import React, { Component } from 'react'
import { AppContext } from 'AppContext'

class App extends Component {
  render() {
    const { router, children } = this.props
    return (
      <div className="app-container">
        <AppContext.Provider value={{ router, setPageTitle: (_title) => {} }}>
          <div className="app-content">{children}</div>
        </AppContext.Provider>
      </div>
    )
  }
}

export default App
