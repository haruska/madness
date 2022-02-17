import React, { Component } from 'react'
import { arrayOf, shape, string } from 'prop-types'

import moment from 'moment'

export default class RoundsBanner extends Component {
  static propTypes = {
    rounds: arrayOf(
      shape({
        name: string.isRequired,
        startDate: string.isRequired,
        endDate: string.isRequired,
      })
    ).isRequired,
  }

  dateRangeString = (start, end) => {
    const startDate = moment(start)
    const endDate = moment(end)
    let dateStr = startDate.format('MMM D')

    if (endDate > startDate) {
      dateStr += `-${endDate.format('D')}`
    }

    return dateStr
  }

  render() {
    let reverseRounds = Array.from(this.props.rounds).reverse()
    reverseRounds.shift()

    let rounds = this.props.rounds.concat(reverseRounds)

    return (
      <table className="rounds-banner">
        <tbody>
          <tr>
            {rounds.map((r, i) => (
              <th className="header" key={i}>
                {r.name}
              </th>
            ))}
          </tr>
          <tr>
            {rounds.map((r, i) => (
              <td className="date-range" key={i}>
                {this.dateRangeString(r.startDate, r.endDate)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    )
  }
}
