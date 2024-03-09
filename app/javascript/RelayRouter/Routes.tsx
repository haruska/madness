import { makeRouteConfig, Route } from 'found'
import React from 'react'
import { graphql } from 'react-relay'
import { MainLayout } from 'components/Layouts/MainLayout'
import { App } from 'App'
import { EditBracket } from 'containers/EditBracket'

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

export default makeRouteConfig(
  <Route path="/" Component={App}>
    <Route Component={MainLayout} query={MainLayoutQuery}>
      <Route path="brackets/:bracketId/edit" Component={EditBracket} query={EditBracketQuery} />
    </Route>
  </Route>
)
