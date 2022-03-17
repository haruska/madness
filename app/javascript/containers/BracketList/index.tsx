import React, { useContext, useEffect, useState } from 'react'
import { graphql, createRefetchContainer, RelayRefetchProp } from 'react-relay'
import { AppContext } from 'AppContext'
import { TableHeader } from './TableHeader'
import { BracketRow } from './BracketRow'
import SmallBracket from './SmallBracket'
import { BracketList_viewer$data } from 'RelayArtifacts/BracketList_viewer.graphql'
import { DEFAULT_TITLE } from 'components/Layouts/MainLayout'

const Component = ({
  viewer,
  relay,
}: {
  viewer: BracketList_viewer$data
  relay: RelayRefetchProp
}) => {
  const { setPageTitle } = useContext(AppContext)
  const [hasRefetched, setHasRefetched] = useState<boolean>(false)

  useEffect(() => {
    setPageTitle(`Brackets (${viewer.brackets.totalCount} total)`)

    const refetchVariables = { count: viewer.brackets.totalCount }
    const callback = () => setHasRefetched(true)

    if (!hasRefetched) {
      relay.refetch(refetchVariables, null, callback, { force: true })
    }

    return () => {
      setPageTitle(DEFAULT_TITLE)
    }
  })

  const brackets = viewer.brackets.nodes

  const bracketsWithPlace = (() => {
    let placeBrackets: BracketList_viewer$data['brackets']['nodes'][0][][] = []

    let currentPlace = 0
    brackets.forEach((b, i) => {
      if (i !== 0 && b.points !== brackets[i - 1].points) {
        currentPlace = i
      }
      placeBrackets[currentPlace] = placeBrackets[currentPlace] || []
      placeBrackets[currentPlace].push(b)
    })

    return placeBrackets
  })()

  return (
    <div className="bracket-list-container">
      <div className="large-screen">
        <table className="tables">
          {/*<TableHeader showEliminated={this.showEliminated()} />*/}
          <TableHeader showEliminated={false} />
          <tbody>
            {bracketsWithPlace
              .map((brackets, place) =>
                brackets.map((bracket) => (
                  <BracketRow
                    key={bracket.id}
                    index={place + 1}
                    tied={brackets.length > 1}
                    // showEliminated={this.showEliminated()}
                    showEliminated={false}
                    bracket={bracket}
                  />
                ))
              )
              .reduce((acc, val) => acc.concat(val), [])}
          </tbody>
        </table>
      </div>

      <div className="small-screen">
        {bracketsWithPlace
          .map((brackets, place) =>
            brackets.map((bracket) => (
              <SmallBracket
                key={bracket.id}
                index={place + 1}
                tied={brackets.length > 1}
                bracket={bracket}
                // showEliminated={this.showEliminated()}
                showEliminated={false}
              />
            ))
          )
          .reduce((acc, val) => acc.concat(val), [])}
      </div>
    </div>
  )
}

export const BracketList = createRefetchContainer(
  Component,
  {
    viewer: graphql`
      fragment BracketList_viewer on Viewer
      @argumentDefinitions(count: { type: "Int", defaultValue: 25 }) {
        brackets(first: $count) {
          nodes {
            id
            points
            possiblePoints
            ...BracketRow_bracket
            ...SmallBracket_bracket
          }
          totalCount
        }
      }
    `,
  },
  graphql`
    query BracketListRefetchQuery($count: Int!) {
      viewer {
        ...BracketList_viewer @arguments(count: $count)
      }
    }
  `
)
