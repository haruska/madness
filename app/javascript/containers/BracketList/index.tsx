import React, { useContext, useEffect } from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { AppContext } from 'AppContext'
import { TableHeader } from './TableHeader'
import { BracketRow } from './BracketRow'
import SmallBracket from './SmallBracket'
import { BracketList_viewer$data } from 'RelayArtifacts/BracketList_viewer.graphql'
import { DEFAULT_TITLE } from '../../components/Layouts/MainLayout'

const Component = ({ viewer }: { viewer: BracketList_viewer$data }) => {
  const { setPageTitle } = useContext(AppContext)

  useEffect(() => {
    setPageTitle(`Brackets (${viewer.brackets.totalCount} total)`)

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
        currentPlace = i + 1
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

export const BracketList = createFragmentContainer(Component, {
  viewer: graphql`
    fragment BracketList_viewer on Viewer {
      brackets {
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
})
