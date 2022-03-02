import GameNode from './GameNode'
import { Team } from 'AppContext'

const NUM_GAMES = 63

export default class TournamentTree {
  gameNodes: GameNode[]

  constructor(decisions: bigint, mask: bigint) {
    this.gameNodes = Array(NUM_GAMES + 1)
      .fill(null)
      .map((_, num) => {
        if (num === 0) return null
        const i = BigInt(num)

        const maskBit = 1n << i
        if ((mask & maskBit) !== 0n) {
          const decision = ((decisions >> i) & 1n) === 0n ? 0 : 1
          return new GameNode(this, num, decision)
        } else {
          return new GameNode(this, num, null)
        }
      })
  }

  firstGame = (team: Team) => {
    const firstGameSlot =
      (team.startingSlot % 2 === 0 ? team.startingSlot : team.startingSlot - 1) / 2
    return this.gameNodes[firstGameSlot]
  }

  stillPlaying = (team: Team): boolean => {
    let game = this.firstGame(team)
    while (game && game.decision !== null) {
      if (game.winningTeamStartingSlot() !== team.startingSlot) return false
      game = game.parentGame()
    }
    return true
  }
}
