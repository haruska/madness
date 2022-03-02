import React, { useContext, useEffect } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

import { AppContext } from 'AppContext'
import UserTableHeader from './UserTableHeader'
import { UserBracketRow } from './UserBracketRow'
import { UserSmallBracket } from './UserSmallBracket'
import { NewBracketButton } from './NewBracketButton'
import { UserBracketList_viewer$data } from 'RelayArtifacts/UserBracketList_viewer.graphql'
import { DEFAULT_TITLE } from 'components/Layouts/MainLayout'

const Component = ({ viewer }: { viewer: UserBracketList_viewer$data }) => {
  const { router, tournament, setPageTitle } = useContext(AppContext)
  const brackets = viewer.brackets.nodes

  useEffect(() => {
    if (tournament.started) {
      router.replace(`/brackets`)
    }

    if (brackets.length === 0) {
      router.push(`/new_bracket`)
    }

    setPageTitle('My Brackets')

    return () => {
      setPageTitle(DEFAULT_TITLE)
    }
  })

  return (
    <div className="user-bracket-list-container">
      <div className="small-screen">
        {brackets.map((bracket) => (
          <UserSmallBracket key={bracket.id} bracket={bracket} />
        ))}
      </div>
      <div className="large-screen">
        <table className="table-minimal">
          <UserTableHeader bracketCount={brackets.length} />
          <tbody>
            {brackets.map((bracket) => (
              <UserBracketRow key={bracket.id} bracket={bracket} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="actions">
        <NewBracketButton bracketCount={brackets.length} />
      </div>
    </div>
  )
}

export const UserBracketList = createFragmentContainer(Component, {
  viewer: graphql`
    fragment UserBracketList_viewer on Viewer {
      id
      brackets {
        nodes {
          id
          paid
          user {
            id
          }
          ...UserSmallBracket_bracket
          ...UserBracketRow_bracket
        }
      }
    }
  `,
})
