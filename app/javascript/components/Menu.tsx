import React, { useState } from 'react'

export const Menu = ({
  admin,
  started
}: {
  admin: boolean
  started: boolean
}) => {
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

    if (admin) {
      links.push(<a href="/admin">Admin Dashboard</a>)
    }

    if (started) {
      links.push(<a href="/brackets" onClick={handleToggleMenuClick}>Brackets</a>)
    } else {
      links.push(<a href="/my_brackets" onClick={handleToggleMenuClick}>My Brackets</a>)
    }

    links.push(<a href="/games" onClick={handleToggleMenuClick}>Game Results</a>)
    links.push(<a href="/rules" onClick={handleToggleMenuClick}>Rules and Scoring</a>)
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
