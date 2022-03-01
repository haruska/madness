import React, { Context } from 'react'
import { Router } from 'found'
import { MainLayout_viewer$data } from './RelayArtifacts/MainLayout_viewer.graphql'

type Tournament64 = MainLayout_viewer$data['tournament64']
export type Team = MainLayout_viewer$data['teams'][0]
type Teams = MainLayout_viewer$data['teams']

export interface Tournament {
  rounds: Tournament64['rounds']
  tipOff: Tournament64['tipOff']
  gameDecisions: bigint
  gameMask: bigint
}

export const AppContext: Context<{
  router: Router
  tournament: Tournament
  teams: Teams
  setPageTitle: (title: string) => void
}> = React.createContext({
  router: null,
  tournament: null,
  teams: [],
  setPageTitle: (title: string) => title,
})
