import React, { Component } from 'react'
import { Link } from 'found'
import { AppContext } from 'AppContext'
import { createFragmentContainer, graphql } from 'react-relay'

class Menu extends Component {
  static contextType = AppContext

  state = { isVisible: false }

  handleToggleMenuClick = () => {
    this.setState({ isVisible: !this.state.isVisible })
  }

  handleLogout = () => {
    this.handleToggleMenuClick()
    fetch('/users/sign_out', {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
      },
      credentials: 'same-origin',
    }).then(() => (window.location = '/'))
  }

  buildLinks = () => {
    const { viewer } = this.props
    const { tournament64, currentUser } = viewer
    let links = []

    if (currentUser.admin) {
      links.push(<a href="/admin">Admin Dashboard</a>)
    }
    //
    if (tournament64.started) {
      //     links.push(
      //       <Link to={`/pools/${pool.id}/brackets`} onClick={this.handleToggleMenuClick}>
      //         Brackets
      //       </Link>
      //     )
      //
      //     if (pool.tournament.gamesRemaining > 0 && pool.tournament.gamesRemaining < 4) {
      //       links.push(
      //         <Link to={`/pools/${pool.id}/possibilities`} onClick={this.handleToggleMenuClick}>
      //           Possible Outcomes
      //         </Link>
      //       )
      //     }
    } else {
      links.push(
        <Link to={`/my_brackets`} onClick={this.handleToggleMenuClick}>
          My Brackets
        </Link>
      )
    }
    links.push(
      <Link to={`/games`} onClick={this.handleToggleMenuClick}>
        Game Results
      </Link>
    )

    //   links.push(
    //     <Link to={`/rules`} onClick={this.handleToggleMenuClick}>
    //       Rules and Scoring
    //     </Link>

    links.push(<a onClick={this.handleLogout}>Sign Out</a>)

    return links
  }

  signedInLinks = (contentClass) => {
    return (
      <div>
        <a className="sliding-panel-button" onClick={this.handleToggleMenuClick}>
          <i className="fa fa-bars" />
        </a>
        <nav className={contentClass}>
          <ul>
            {this.buildLinks().map((link, i) => (
              <li key={`link-${i}`}>{link}</li>
            ))}
          </ul>
        </nav>
      </div>
    )
  }

  render() {
    const isVisibleStyle = this.state.isVisible ? 'is-visible' : null
    const contentClass = `sliding-panel-content ${isVisibleStyle}`
    const panelClass = `sliding-panel-fade-screen ${isVisibleStyle}`
    const links = this.signedInLinks(contentClass)

    return (
      <div className="menu">
        {links}
        <div className={panelClass} onClick={this.handleToggleMenuClick} />
      </div>
    )
  }
}

export default createFragmentContainer(Menu, {
  viewer: graphql`
    fragment Menu_viewer on Viewer {
      currentUser {
        admin
      }
      tournament64 {
        started
      }
    }
  `,
})
