import TournamentTree from './TournamentTree'
import GameNode from './GameNode'
import { Team as ContextTeam } from 'AppContext'

export default class Team {
  tree: TournamentTree
  startingSlot: number
  graphTeam: ContextTeam
  seed: number
  name: string
  firstGame: GameNode

  constructor(tree: TournamentTree, team: ContextTeam) {
    this.tree = tree
    this.graphTeam = team
    this.startingSlot = team.startingSlot
    this.seed = team.seed
    this.name = team.name

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
