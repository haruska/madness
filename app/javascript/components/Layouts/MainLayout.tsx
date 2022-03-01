import React, { PropsWithChildren, useState } from 'react'
import Header from './Header'
import { AppContext } from 'AppContext'
import { createFragmentContainer, graphql } from 'react-relay'
import { Router } from 'found'
import { MainLayout_viewer$data } from 'RelayArtifacts/MainLayout_viewer.graphql'

export const DEFAULT_TITLE = 'Pool Madness'

const MainLayoutComponent = ({
  router,
  viewer,
  children,
}: PropsWithChildren<{
  router: Router
  viewer: MainLayout_viewer$data
}>) => {
  const [title, setTitle] = useState(DEFAULT_TITLE)
  const { tournament64, teams } = viewer

  const tournament = {
    ...tournament64,
    gameDecisions: BigInt(tournament64.gameDecisions),
    gameMask: BigInt(tournament64.gameMask),
  }

  const setPageTitle = (title: string) => setTitle(title || DEFAULT_TITLE)

  return (
    <div className="main-layout-component">
      <AppContext.Provider
        value={{
          router,
          tournament,
          teams,
          setPageTitle: setPageTitle,
        }}
      >
        <Header title={title} viewer={viewer} />
        <section className="container" id="content">
          <div className="wrapper">{children}</div>
        </section>
        <footer />
      </AppContext.Provider>
    </div>
  )
}

export const MainLayout = createFragmentContainer(MainLayoutComponent, {
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
      }
      teams {
        id
        startingSlot
        seed
        name
      }
      ...Header_viewer
    }
  `,
})
