import { makeRouteConfig, Route } from 'found'
import React from 'react'
import { graphql } from 'react-relay'
import { MainLayout } from 'components/Layouts/MainLayout'
import { App } from 'App'
import { BracketList } from 'containers/BracketList'
import { EditBracket } from 'containers/EditBracket'
import { NewBracket } from 'containers/NewBracket'
import { Games } from 'containers/Games'
import { EditTournament } from 'containers/EditTournament'

const MainLayoutQuery = graphql`
  query Routes_MainLayout_Query {
    viewer {
      ...MainLayout_viewer
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
    <Route Component={MainLayout} query={MainLayoutQuery}>
      {/*    <Route path="possibilities" Component={Possibilities} query={PossibilitiesQuery} />*/}
      <Route path="brackets" Component={BracketList} query={BracketListQuery} />
      <Route path="new_bracket" Component={NewBracket} />
      <Route path="games" Component={Games} />
      <Route path="tournament/edit" Component={EditTournament} />
      <Route path="brackets/:bracketId/edit" Component={EditBracket} query={EditBracketQuery} />
    </Route>
  </Route>
)
