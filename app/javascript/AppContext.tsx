import React from 'react'

export const AppContext = React.createContext({
  router: null,
  setPageTitle: (title: string) => title,
})

export const { Provider, Consumer } = AppContext
