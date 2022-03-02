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

  //
  // componentDidMount() {
  //   this.updateData()
  // }
  // updateData = () => {
  //   const { lastUpdate } = this.state
  //   const { relay, viewer } = this.props
  //
  //   const refetchVariables = { count: viewer.brackets.totalCount }
  //   const callback = () => this.setState({ lastUpdate: moment() })
  //
  //   if (
  //     !lastUpdate ||
  //     moment()
  //       .subtract(10, 'seconds')
  //       .isAfter(lastUpdate)
  //   ) {
  //     relay.refetch(refetchVariables, null, callback, { force: true })
  //   }
  // }
  //
  // handleRefresh = () => {
  //   this.updateData()
  // }

  const brackets = viewer.brackets.nodes

  const bracketsWithPlace = (() => {
    let placeBrackets = {}

    let currentPlace = 1
    brackets.forEach((b, i) => {
      if (i !== 0 && b.points !== brackets[i - 1].points) {
        currentPlace = i + 1
      }
      placeBrackets[currentPlace] = placeBrackets[currentPlace] || []
      placeBrackets[currentPlace].push(b)
    })

    return placeBrackets
  })()

  // showEliminated = () => {
  //   return this.props.pool.displayBest
  // }

  return (
    <div className="bracket-list-container">
      {/*<div className="refresh-wrapper">*/}
      {/*  <div className="refresh-time">*/}
      {/*    Last updated {this.state.lastUpdate && this.state.lastUpdate.format('h:mm a')}*/}
      {/*  </div>*/}
      {/*  <div className="refresh-link">*/}
      {/*    [*/}
      {/*    <a className="refresh" onClick={this.handleRefresh}>*/}
      {/*      Refresh*/}
      {/*    </a>*/}
      {/*    ]*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="large-screen">
        <table className="tables">
          {/*<TableHeader showEliminated={this.showEliminated()} />*/}
          <TableHeader showEliminated={false} />
          <tbody>
            {Object.keys(bracketsWithPlace)
              .map((place) =>
                bracketsWithPlace[place].map((bracket) => (
                  <BracketRow
                    key={bracket.id}
                    index={place}
                    tied={bracketsWithPlace[place].length > 1}
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
        {Object.keys(bracketsWithPlace)
          .map((place) =>
            bracketsWithPlace[place].map((bracket) => (
              <SmallBracket
                key={bracket.id}
                index={place}
                tied={bracketsWithPlace[place].length > 1}
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
