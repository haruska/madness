import React, { Component } from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

import { AppContext } from 'AppContext'
import UserTableHeader from './UserTableHeader'
import { UserBracketRow } from './UserBracketRow'
import UserSmallBracket from './UserSmallBracket'
import NewBracketButton from './NewBracketButton'

class UserBracketList extends Component {
  static contextType = AppContext

  state = {
    generatingBracket: false,
  }

  componentWillMount() {
    const { tournament64 } = this.props.viewer
    const { router, setPageTitle } = this.context

    if (tournament64.started) {
      router.replace(`/brackets`) // eslint-disable-line
    }

    const brackets = this.brackets()

    if (!brackets || brackets.length === 0) {
      router.push(`/new_bracket`)
    }

    setPageTitle('My Brackets')
  }

  componentWillUnmount() {
    this.context.setPageTitle()
  }

  brackets = () => this.props.viewer.brackets.nodes

  trackNewBracketClick = () => {
    this.setState({ generatingBracket: true })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextState.generatingBracket
  }

  render() {
    const brackets = this.brackets()

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
          <NewBracketButton
            bracketCount={brackets.length}
            clickHandler={this.trackNewBracketClick}
          />
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(UserBracketList, {
  viewer: graphql`
    fragment UserBracketList_viewer on Viewer {
      id
      tournament64 {
        started
      }
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
