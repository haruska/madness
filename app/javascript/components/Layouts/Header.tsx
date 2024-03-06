import React from 'react'
import { Menu } from 'components/Menu'

export const Header = ({
  title,
  admin,
  started
}: {
  title?: string
  admin: boolean
  started: boolean
}) => {
  return (
    <header className="header-component">
      <div className="title-wrapper">
        <div className="title">{title || 'Pool Madness'}</div>
      </div>
      <Menu  admin={admin} started={started} />
    </header>
  )
}
