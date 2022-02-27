import { MainLayout_viewer$data as Viewer } from 'RelayArtifacts/MainLayout_viewer.graphql'
import TournamentTree from './TournamentTree'
import GameNode from './GameNode'

type Tournament = Viewer['tournament64']

export default class Team {
  tournament: Tournament
  tree: TournamentTree
  startingSlot: number
  graphTeam: Tournament['teams'][0]
  seed: number
  name: string
  firstGame: GameNode

  constructor(tournament: Tournament, tree: TournamentTree, startingSlot: number) {
    this.tournament = tournament
    this.tree = tree
    this.startingSlot = startingSlot
    this.graphTeam = tournament.teams.find((t) => t.startingSlot === startingSlot)
    this.seed = this.graphTeam.seed
    this.name = this.graphTeam.name

    let gameIndex = (this.startingSlot % 2 === 0 ? this.startingSlot : this.startingSlot - 1) / 2
    this.firstGame = tree.gameNodes[gameIndex]
  }

  stillPlaying = (): boolean => {
    let game = this.firstGame
    while (game && game.decision !== null) {
      if (game.winningTeamStartingSlot() !== this.startingSlot) return false
      game = game.parentGame()
    }
    return true
  }
}
