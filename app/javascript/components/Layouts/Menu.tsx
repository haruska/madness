import React, { useContext, useState } from 'react'
import { Link } from 'found'
import { AppContext } from 'AppContext'

export const Menu = () => {
  const { tournament, currentUser } = useContext(AppContext)
  const [isVisible, setIsVisible] = useState(false)

  const handleToggleMenuClick = () => {
    setIsVisible(!isVisible)
  }

  const handleLogout = () => {
    handleToggleMenuClick()

    fetch('/users/sign_out', {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0]?.attributes['content']?.value,
      },
      credentials: 'same-origin',
    }).then(() => (window.location.href = '/'))
  }

  const buildLinks = () => {
    let links = []

    if (currentUser.admin) {
      links.push(<a href="/admin">Admin Dashboard</a>)
    }

    if (tournament.started) {
      links.push(
        <Link to={`/brackets`} onClick={handleToggleMenuClick}>
          Brackets
        </Link>
      )
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
        <Link to={`/my_brackets`} onClick={handleToggleMenuClick}>
          My Brackets
        </Link>
      )
    }
    links.push(
      <Link to={`/games`} onClick={handleToggleMenuClick}>
        Game Results
      </Link>
    )

    links.push(
      <Link to={`/rules`} onClick={handleToggleMenuClick}>
        Rules and Scoring
      </Link>
    )

    links.push(<a onClick={handleLogout}>Sign Out</a>)

    return links
  }

  const signedInLinks = (contentClass: string) => {
    return (
      <div>
        <a className="sliding-panel-button" onClick={handleToggleMenuClick}>
          <i className="fa fa-bars" />
        </a>
        <nav className={contentClass}>
          <ul>
            {buildLinks().map((link, i) => (
              <li key={`link-${i}`}>{link}</li>
            ))}
          </ul>
        </nav>
      </div>
    )
  }

  const isVisibleStyle = isVisible ? 'is-visible' : null
  const contentClass = `sliding-panel-content ${isVisibleStyle}`
  const panelClass = `sliding-panel-fade-screen ${isVisibleStyle}`
  const links = signedInLinks(contentClass)

  return (
    <div className="menu">
      {links}
      <div className={panelClass} onClick={handleToggleMenuClick} />
    </div>
  )
}
