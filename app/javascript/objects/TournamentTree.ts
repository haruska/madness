import { times } from 'lodash'
import GameNode from './GameNode'

export default class TournamentTree {
    numRounds: number
    decisions: bigint
    mask: bigint
    gameNodes: GameNode[]

    constructor(numRounds: number, decisions: bigint, mask: bigint) {
        this.numRounds = numRounds
        this.decisions = decisions
        this.mask = mask
        this.gameNodes = times(Math.pow(2, numRounds), (num) => {
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
}
