import React, { Component } from 'react'
import Header from './Header'
import { Provider } from 'AppContext'
import { createFragmentContainer, graphql } from 'react-relay'

class MainLayout extends Component {
  state = { title: 'Pool Madness' }

  setPageTitle = (title) => {
    const newTitle = title || 'Pool Madness'
    this.setState({ title: newTitle })
  }

  render() {
    const { router, viewer } = this.props
    const { tournament64 } = viewer

    const tournament = {
      ...tournament64,
      gameDecisions: BigInt(tournament64.gameDecisions),
      gameMask: BigInt(tournament64.gameMask),
    }

    return (
      <div className="main-layout-component">
        <Provider
          value={{
            router,
            tournament,
            setPageTitle: this.setPageTitle,
          }}
        >
          <Header title={this.state.title} viewer={viewer} />
          <section className="container" id="content">
            <div className="wrapper">{this.props.children}</div>
          </section>
          <footer />
        </Provider>
      </div>
    )
  }
}

export default createFragmentContainer(MainLayout, {
  viewer: graphql`
    fragment MainLayout_viewer on Viewer {
      tournament64 {
        rounds {
          name
          number
          startDate
          endDate
          regions
        }
        tipOff
        gameDecisions
        gameMask
        teams {
          startingSlot
          seed
          name
        }
      }
      ...Header_viewer
    }
  `,
})
