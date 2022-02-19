import React, { Component } from 'react'
import Menu from './Menu'
import {createFragmentContainer, graphql} from "react-relay";

class Header extends Component {
  render() {
      const { title, viewer } = this.props
    return (
      <header className="header-component">
          <div className="title-wrapper">
              <div className="title">{title || 'Pool Madness'}</div>
          </div>
          <Menu viewer={viewer} />
      </header>
    )
  }
}

export default createFragmentContainer(Header, {
    viewer: graphql`
        fragment Header_viewer on Viewer {
            ...Menu_viewer
        }
    `,
})