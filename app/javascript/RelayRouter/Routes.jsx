import {makeRouteConfig, Route} from 'found'
import React from 'react'
// import graphql from 'babel-plugin-relay/macro'
// import MainLayout from '../components/layouts/MainLayout'
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
// import UserBracketList from '../containers/UserBracketList'
// import Bracket from '../containers/Bracket'
// import EditBracket from '../containers/EditBracket'
// import NewBracket from '../containers/NewBracket'
// import Games from '../containers/Games'
// import RulesAndScoring from '../containers/RulesAndScoring'
// import Payments from '../containers/Payments'
// import AdminBrackets from '../containers/AdminBrackets'

// const PoolAdminGateQuery = graphql`
//   query Routes_PoolAdminGate_Query($poolId: ID!) {
//     viewer {
//       ...PoolAdminGate_viewer
//     }
//
//     pool: node(id: $poolId) {
//       ...PoolAdminGate_pool
//     }
//   }
// `
//
// const PoolListQuery = graphql`
//   query Routes_PoolList_Query {
//     viewer {
//       ...PoolList_viewer
//     }
//   }
// `
//
// const ProfileQuery = graphql`
//   query Routes_Profile_Query {
//     viewer {
//       ...Profile_viewer
//     }
//   }
// `
//
// const EditProfileQuery = graphql`
//   query Routes_EditProfile_Query {
//     viewer {
//       ...EditProfile_viewer
//     }
//   }
// `
//
// const PoolLayoutQuery = graphql`
//   query Routes_PoolLayout_Query($poolId: ID!) {
//     viewer {
//       ...PoolLayout_viewer
//     }
//
//     pool: node(id: $poolId) {
//       ...PoolLayout_pool
//     }
//   }
// `
//
// const BracketLayoutQuery = graphql`
//   query Routes_BracketLayout_Query($bracketId: ID!) {
//     viewer {
//       ...BracketLayout_viewer
//     }
//
//     bracket: node(id: $bracketId) {
//       ...BracketLayout_bracket
//     }
//   }
// `
//
// const PoolQuery = graphql`
//   query Routes_Pool_Query($poolId: ID!) {
//     pool: node(id: $poolId) {
//       ...Pool_pool
//     }
//   }
// `
//
// const PossibilitiesQuery = graphql`
//   query Routes_Possibilities_Query($poolId: ID!) {
//     pool: node(id: $poolId) {
//       ...Possibilities_pool
//     }
//   }
// `
//
// const BracketListQuery = graphql`
//   query Routes_BracketList_Query($poolId: ID!) {
//     viewer {
//       ...BracketList_viewer
//     }
//
//     pool: node(id: $poolId) {
//       ...BracketList_pool
//     }
//   }
// `
//
// const UserBracketListQuery = graphql`
//   query Routes_UserBracketList_Query($poolId: ID!) {
//     viewer {
//       ...UserBracketList_viewer
//     }
//
//     pool: node(id: $poolId) {
//       ...UserBracketList_pool
//     }
//   }
// `
//
// const BracketQuery = graphql`
//   query Routes_Bracket_Query($bracketId: ID!) {
//     bracket: node(id: $bracketId) {
//       ...Bracket_bracket
//     }
//   }
// `
//
// const EditBracketQuery = graphql`
//   query Routes_EditBracket_Query($bracketId: ID!) {
//     bracket: node(id: $bracketId) {
//       ...EditBracket_bracket
//     }
//   }
// `
//
// const NewBracketQuery = graphql`
//   query Routes_NewBracket_Query($poolId: ID!) {
//     viewer {
//       ...NewBracket_viewer
//     }
//     pool: node(id: $poolId) {
//       ...NewBracket_pool
//     }
//   }
// `
//
// const GamesQuery = graphql`
//   query Routes_Games_Query($poolId: ID!) {
//     pool: node(id: $poolId) {
//       ...Games_pool
//     }
//   }
// `
//
// const RulesAndScoringQuery = graphql`
//   query Routes_RulesAndScoring_Query($poolId: ID!) {
//     pool: node(id: $poolId) {
//       ...RulesAndScoring_pool
//     }
//   }
// `
//
// const PaymentsQuery = graphql`
//   query Routes_Payments_Query($poolId: ID!) {
//     pool: node(id: $poolId) {
//       ...Payments_pool
//     }
//   }
// `
//
// const AdminBracketsQuery = graphql`
//   query Routes_AdminBrackets_Query($poolId: ID!) {
//     pool: node(id: $poolId) {
//       ...AdminBrackets_pool
//     }
//   }
// `

export default makeRouteConfig(
  <Route path="/" Component={App}>
    <Route Component={Home} />
    {/*<Route path="login" Component={Login} />*/}
    {/*<Route Component={AuthGate}>*/}
    {/*  <Route Component={MainLayout}>*/}
    {/*    <Route path="pools" Component={PoolList} query={PoolListQuery} />*/}
    {/*    <Route path="user" Component={Profile} query={ProfileQuery} />*/}
    {/*    <Route path="user/edit" Component={EditProfile} query={EditProfileQuery} />*/}
    {/*  </Route>*/}
    {/*  <Route path="pools/:poolId" Component={PoolLayout} query={PoolLayoutQuery}>*/}
    {/*    <Route Component={Pool} query={PoolQuery} />*/}
    {/*    <Route path="possibilities" Component={Possibilities} query={PossibilitiesQuery} />*/}
    {/*    <Route path="brackets" Component={BracketList} query={BracketListQuery} />*/}
    {/*    <Route path="my_brackets" Component={UserBracketList} query={UserBracketListQuery} />*/}
    {/*    <Route path="new_bracket" Component={NewBracket} query={NewBracketQuery} />*/}
    {/*    <Route path="games" Component={Games} query={GamesQuery} />*/}
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
    {/*</Route>*/}
  </Route>
)
