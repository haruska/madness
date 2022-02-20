import React, { Component } from 'react'
// import { shape, string, bool, number, arrayOf } from 'prop-types'
import { Link } from 'found'
// import { find } from 'lodash'
import { AppContext } from '../../AppContext'
import { createFragmentContainer, graphql } from 'react-relay'

class Menu extends Component {
  static contextType = AppContext
  // static propTypes = {
  //   pool: shape({
  //     id: string.isRequired,
  //     started: bool.isRequired,
  //     admins: arrayOf(
  //       shape({
  //         id: string.isRequired,
  //       })
  //     ).isRequired,
  //     tournament: shape({
  //       gamesRemaining: number.isRequired,
  //     }).isRequired,
  //   }),
  //   viewer: shape({
  //     currentUser: shape({
  //       userId: string.isRequired,
  //       admin: bool.isRequired,
  //     }).isRequired,
  //   }),
  // }

  state = { isVisible: false }

  handleToggleMenuClick = () => {
    this.setState({ isVisible: !this.state.isVisible })
  }

  // handleLogout = () => {
  //   this.handleToggleMenuClick()
  //   this.context.router.push('/login')
  // }

  buildLinks = () => {
    const { viewer } = this.props
    const { tournament64, currentUser } = viewer
    let links = []
    //
    //   if (tournament.started) {
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
    links.push(
      <Link to={`/games`} onClick={this.handleToggleMenuClick}>
        Game Results
      </Link>
    )
    // } else {
    //     links.push(
    //       <Link to={`/pools/${pool.id}/my_brackets`} onClick={this.handleToggleMenuClick}>
    //         My Brackets
    //       </Link>
    //     )
    //     links.push(
    //       <Link to={`/pools/${pool.id}/payments`} onClick={this.handleToggleMenuClick}>
    //         Types of Payment
    //       </Link>
    //     )
    //   }
    //
    //   links.push(
    //     <Link to={`/pools/${pool.id}/rules`} onClick={this.handleToggleMenuClick}>
    //       Rules and Scoring
    //     </Link>
    //   )
    //
    //   if (currentUser.admin || this.currentUserIsPoolAdmin()) {
    //     links.push(
    //       <Link to={`/pools/${pool.id}/admin/brackets`} onClick={this.handleToggleMenuClick}>
    //         Pool Admin
    //       </Link>
    //     )
    //   }
    //
    //   links.push(
    //     <Link to="/pools" onClick={this.handleToggleMenuClick}>
    //       Other Pools
    //     </Link>
    //   )
    //

    links.push(
        <a href="/sign_out">Sign Out</a>
    )
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

  // currentUserIsPoolAdmin = () => {
  //   const { pool, viewer } = this.props
  //   const { currentUser } = viewer
  //   const adminIds = pool.admins.map(admin => admin.id)
  //
  //   return !!find(adminIds, id => id === currentUser.userId)
  // }

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
