import React from 'react'

export const AppContext = React.createContext({
  router: null,
  tournament: null,
  setPageTitle: (title: string) => title,
})

export const { Provider, Consumer } = AppContext
