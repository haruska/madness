import React, { useContext } from 'react'
import { AppContext } from 'AppContext'
import { ordinalInWord } from 'lib/ordinals'
import { fibonacci } from 'lib/fibonacci'

const ScoreRow = ({ round }: { round: number }) => {
  return (
    <tr>
      <td>{ordinalInWord(round)}</td>
      <td>{fibonacci(round + 1)} + Seed Number</td>
    </tr>
  )
}

const PrizeRow = ({ place, percent }: { place: number; percent: number }) => {
  return (
    <tr>
      <td>{ordinalInWord(place)} Place</td>
      <td>{Math.round(percent * 100)}%</td>
    </tr>
  )
}

export const RulesAndScoring = () => {
  const { tournament } = useContext(AppContext)

  const formattedTipOffTime = () => {
    // let tipOff = moment(this.props.pool.tournament.tipOff).tz('America/New_York')
    const tipOff = new Date(tournament.tipOff)
    const dateStr = Intl.DateTimeFormat('en', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(tipOff)
    const timeStr = Intl.DateTimeFormat('en', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZoneName: 'short',
    }).format(tipOff)
    return `${dateStr} at ${timeStr}`
  }

  return (
    <div className="rules-and-scoring-container">
      <div className="rules-settings">
        <h3 className="sub-heading">Pool Settings</h3>
        <table>
          <tbody>
            <tr>
              <td>Entry Amount</td>
              <td>$10</td>
            </tr>
            <tr>
              <td>Seed reward?</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Entry Deadline</td>
              <td>{formattedTipOffTime()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="prizes">
        <h3 className="sub-heading">Prizes</h3>
        <table>
          <tbody>
            {[0.45, 0.25, 0.15, 0.1, 0.05].map((percent, i) => (
              <PrizeRow key={`prizerow-${i}`} place={i + 1} percent={percent} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="scoring">
        <h3 className="sub-heading">Scoring</h3>
        <table>
          <thead>
            <tr>
              <th>Round</th>
              <th>Points per Game</th>
            </tr>
          </thead>
          <tbody>
            {Array(tournament.rounds.length)
              .fill(null)
              .map((_, i) => (
                <ScoreRow key={i} round={i + 1} />
              ))}
          </tbody>
        </table>
        <div>
          For all correct picks you get that round's points <em>plus</em> the seed number of the
          team. So, if you pick the 10th-seed team to win the 3rd-round, that would be 13 points if
          correct.
        </div>

        <h3 className="sub-heading">In case of a tie</h3>
        <div>If multiple brackets are tied they split the winnings.</div>
      </div>
    </div>
  )
}
