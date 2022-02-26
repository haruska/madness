import { makeRouteConfig, Route } from 'found'
import React from 'react'
import { graphql } from 'react-relay'
import MainLayout from '../components/layouts/MainLayout'
// import PoolLayout from '../components/layouts/PoolLayout'
// import BracketLayout from '../components/layouts/BracketLayout'
//
// import AuthGate from '../containers/AuthGate'
// import PoolAdminGate from '../containers/PoolAdminGate'

import App from '../App'
import Home from '../containers/Home'
// import Login from '../containers/Login'
// import PoolList from '../containers/PoolList'
// import Profile from '../containers/Profile'
// import EditProfile from '../containers/EditProfile'
// import Pool from '../containers/Pool'
// import Possibilities from '../containers/Possibilities'
// import BracketList from '../containers/BracketList'
import UserBracketList from '../containers/UserBracketList'
// import Bracket from '../containers/Bracket'
// import EditBracket from '../containers/EditBracket'
// import NewBracket from '../containers/NewBracket'
import Games from '../containers/Games'
// import RulesAndScoring from '../containers/RulesAndScoring'
// import Payments from '../containers/Payments'
// import AdminBrackets from '../containers/AdminBrackets'

const MainLayoutQuery = graphql`
  query Routes_MainLayout_Query {
    viewer {
      ...MainLayout_viewer
    }
  }
`

const GamesQuery = graphql`
  query Routes_Games_Query {
    viewer {
      ...Games_viewer
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

export default makeRouteConfig(
  <Route path="/" Component={App}>
    <Route Component={Home} />
    {/*<Route path="login" Component={Login} />*/}
    {/*<Route Component={AuthGate}>*/}
    <Route Component={MainLayout} query={MainLayoutQuery}>
      {/*    <Route path="pools" Component={PoolList} query={PoolListQuery} />*/}
      {/*    <Route path="user" Component={Profile} query={ProfileQuery} />*/}
      {/*    <Route path="user/edit" Component={EditProfile} query={EditProfileQuery} />*/}
      {/*  </Route>*/}
      {/*  <Route path="pools/:poolId" Component={PoolLayout} query={PoolLayoutQuery}>*/}
      {/*    <Route Component={Pool} query={PoolQuery} />*/}
      {/*    <Route path="possibilities" Component={Possibilities} query={PossibilitiesQuery} />*/}
      {/*    <Route path="brackets" Component={BracketList} query={BracketListQuery} />*/}
      <Route path="my_brackets" Component={UserBracketList} query={UserBracketListQuery} />
      {/*    <Route path="new_bracket" Component={NewBracket} query={NewBracketQuery} />*/}
      <Route path="games" Component={Games} query={GamesQuery} />
      {/*    <Route path="rules" Component={RulesAndScoring} query={RulesAndScoringQuery} />*/}
      {/*    <Route path="payments" Component={Payments} query={PaymentsQuery} />*/}
      {/*    <Route path="admin" Component={PoolAdminGate} query={PoolAdminGateQuery}>*/}
      {/*      <Route path="brackets" Component={AdminBrackets} query={AdminBracketsQuery} />*/}
      {/*    </Route>*/}
      {/*  </Route>*/}
      {/*  <Route path="brackets/:bracketId" Component={BracketLayout} query={BracketLayoutQuery}>*/}
      {/*    <Route Component={Bracket} query={BracketQuery} />*/}
      {/*    <Route path="edit" Component={EditBracket} query={EditBracketQuery} />*/}
      {/*  </Route>*/}
    </Route>
  </Route>
)
