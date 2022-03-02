import React, { PropsWithChildren, useState } from 'react'
import { Header } from './Header'
import { AppContext } from 'AppContext'
import { createFragmentContainer, graphql } from 'react-relay'
import { Router } from 'found'
import { MainLayout_viewer$data } from 'RelayArtifacts/MainLayout_viewer.graphql'
import TournamentTree from 'objects/TournamentTree'

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
  const { tournament64, teams, currentUser } = viewer

  const tournament = {
    ...tournament64,
    gameDecisions: BigInt(tournament64.gameDecisions),
    gameMask: BigInt(tournament64.gameMask),
  }

  const tournamentTree = new TournamentTree(tournament.gameDecisions, tournament.gameMask)

  const setPageTitle = (title: string) => setTitle(title || DEFAULT_TITLE)

  return (
    <div className="main-layout-component">
      <AppContext.Provider
        value={{
          router,
          tournament,
          tournamentTree,
          teams,
          currentUser,
          setPageTitle: setPageTitle,
        }}
      >
        <Header title={title} />
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
        started
      }
      teams {
        id
        startingSlot
        seed
        name
      }
      currentUser {
        id
        name
        email
        admin
      }
    }
  `,
})
