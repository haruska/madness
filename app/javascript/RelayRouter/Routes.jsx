import { makeRouteConfig, Route } from 'found'
import React from 'react'
import { graphql } from 'react-relay'
import { MainLayout } from 'components/Layouts/MainLayout'
import App from 'App'
import { Home } from 'containers/Home'
// import Possibilities from '../containers/Possibilities'
import BracketList from '../containers/BracketList'
import UserBracketList from 'containers/UserBracketList'
import Bracket from 'containers/Bracket'
import EditBracket from 'containers/EditBracket'
import NewBracket from 'containers/NewBracket'
import Games from 'containers/Games'
// import RulesAndScoring from '../containers/RulesAndScoring'

const MainLayoutQuery = graphql`
  query Routes_MainLayout_Query {
    viewer {
      ...MainLayout_viewer
    }
  }
`

const UserBracketListQuery = graphql`
  query Routes_UserBracketList_Query {
    viewer {
      ...UserBracketList_viewer
    }
  }
`

const BracketQuery = graphql`
  query Routes_Bracket_Query($bracketId: ID!) {
    bracket: node(id: $bracketId) {
      ...Bracket_bracket
    }
  }
`

const EditBracketQuery = graphql`
  query Routes_EditBracket_Query($bracketId: ID!) {
    bracket: node(id: $bracketId) {
      ...EditBracket_bracket
    }
  }
`

const BracketListQuery = graphql`
  query Routes_BracketList_Query {
    viewer {
      ...BracketList_viewer
    }
  }
`

export default makeRouteConfig(
  <Route path="/" Component={App}>
    <Route Component={Home} />
    <Route Component={MainLayout} query={MainLayoutQuery}>
      {/*    <Route path="possibilities" Component={Possibilities} query={PossibilitiesQuery} />*/}
      <Route path="brackets" Component={BracketList} query={BracketListQuery} />
      <Route path="my_brackets" Component={UserBracketList} query={UserBracketListQuery} />
      <Route path="new_bracket" Component={NewBracket} />
      <Route path="games" Component={Games} />
      {/*    <Route path="rules" Component={RulesAndScoring} query={RulesAndScoringQuery} />*/}
      <Route path="brackets/:bracketId">
        <Route Component={Bracket} query={BracketQuery} />
        <Route path="edit" Component={EditBracket} query={EditBracketQuery} />
      </Route>
    </Route>
  </Route>
)
