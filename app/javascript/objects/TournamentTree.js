import { times } from 'lodash'
import GameNode from './GameNode'

export default class TournamentTree {
  constructor(numRounds, decisions, mask) {
    this.numRounds = numRounds
    this.decisions = decisions.split('').map(s => parseInt(s, 10))
    this.mask = mask.split('').map(s => parseInt(s, 10))
    this.gameNodes = times(Math.pow(2, numRounds), i => {
      if (i === 0) return null
      if (this.mask[i] === 1) {
        return new GameNode(this, i, this.decisions[i])
      } else {
        return new GameNode(this, i, null)
      }
    })
  }
}
