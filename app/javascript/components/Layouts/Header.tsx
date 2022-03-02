import React from 'react'
import { Menu } from './Menu'

export const Header = ({ title }: { title?: string }) => {
  return (
    <header className="header-component">
      <div className="title-wrapper">
        <div className="title">{title || 'Pool Madness'}</div>
      </div>
      <Menu />
    </header>
  )
}
