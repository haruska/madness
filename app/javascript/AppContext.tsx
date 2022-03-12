import React, { Context } from 'react'
import { Router } from 'found'
import { MainLayout_viewer$data } from './RelayArtifacts/MainLayout_viewer.graphql'
import TournamentTree from './objects/TournamentTree'

type Tournament64 = MainLayout_viewer$data['tournament64']
export type Team = MainLayout_viewer$data['teams'][0]
type Teams = MainLayout_viewer$data['teams']

export interface Tournament {
  id: Tournament64['id']
  policy: Tournament64['policy']
  rounds: Tournament64['rounds']
  tipOff: Tournament64['tipOff']
  gameDecisions: bigint
  gameMask: bigint
  started: boolean
}

export const AppContext: Context<{
  router: Router
  tournament: Tournament
  tournamentTree: TournamentTree
  teams: Teams
  currentUser: MainLayout_viewer$data['currentUser']
  setPageTitle: (title: string) => void
}> = React.createContext({
  router: null,
  tournament: null,
  tournamentTree: null,
  teams: [],
  currentUser: null,
  setPageTitle: (_title: string) => {},
})
