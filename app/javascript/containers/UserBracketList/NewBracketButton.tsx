import React, { useContext } from 'react'
import { AppContext } from 'AppContext'

export const NewBracketButton = ({ bracketCount }: { bracketCount: number }) => {
  const { router } = useContext(AppContext)

  const handleCreate = () => {
    router.push(`/new_bracket`)
  }

  if (bracketCount > 0) {
    return (
      <button className="minor" onClick={handleCreate}>
        Another Bracket Entry
      </button>
    )
  } else {
    return <button onClick={handleCreate}>New Bracket Entry</button>
  }
}
