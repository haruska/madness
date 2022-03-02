import React, { PropsWithChildren } from 'react'
import { AppContext } from 'AppContext'
import { Router } from 'found'

export const App = ({
  router,
  children,
}: PropsWithChildren<{
  router: Router
}>) => {
  return (
    <div className="app-container">
      <AppContext.Provider
        value={{
          router,
          tournament: null,
          tournamentTree: null,
          teams: [],
          currentUser: null,
          setPageTitle: (_title: string) => {},
        }}
      >
        <div className="app-content">{children}</div>
      </AppContext.Provider>
    </div>
  )
}
