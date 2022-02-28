import React, { Component } from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { AppContext } from 'AppContext'
// import moment from 'moment'
//
import TableHeader from './TableHeader'
import BracketRow from './BracketRow'
import SmallBracket from './SmallBracket'

class BracketList extends Component {
  static contextType = AppContext

  constructor(props) {
    super(props)
    this.state = { lastUpdate: null }
  }

  componentWillUnmount() {
    this.context.setPageTitle()
  }

  componentWillMount() {
    this.context.setPageTitle(`Brackets (${this.props.viewer.brackets.totalCount} total)`)
  }
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

  brackets = () => {
    return this.props.viewer.brackets.nodes
  }

  bracketsWithPlace = () => {
    let brackets = this.brackets()
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
  }

  // showEliminated = () => {
  //   return this.props.pool.displayBest
  // }

  render() {
    const { viewer } = this.props
    const bracketsWithPlace = this.bracketsWithPlace()

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
                      viewer={viewer}
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
                  viewer={viewer}
                />
              ))
            )
            .reduce((acc, val) => acc.concat(val), [])}
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(BracketList, {
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
      ...BracketRow_viewer
      ...SmallBracket_viewer
    }
  `,
})
