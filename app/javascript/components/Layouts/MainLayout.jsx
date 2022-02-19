import React, { Component } from 'react'
import Header from './Header'
import { Provider } from '../../AppContext'
import {createFragmentContainer, graphql} from "react-relay";

class MainLayout extends Component {
  state = { title: 'Pool Madness' }

  setPageTitle = title => {
    const newTitle = title || 'Pool Madness'
    this.setState({ title: newTitle })
  }

  render() {
      const { router, viewer } = this.props
    return (
      <div className="main-layout-component">
        <Provider
          value={{
            router,
            setPageTitle: this.setPageTitle,
          }}
        >
          <Header title={this.state.title}  viewer={viewer} />
          <section className="container" id="content">
            {this.props.children}
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
            ...Header_viewer
        }
    `,
})