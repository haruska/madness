import React, { useContext, useEffect } from 'react'
import { AppContext } from 'AppContext'

export const Home = () => {
  const { router } = useContext(AppContext)

  useEffect(() => {
    router.replace('/my_brackets')
  })

  return <div className="home-container">Loading...</div>
}
