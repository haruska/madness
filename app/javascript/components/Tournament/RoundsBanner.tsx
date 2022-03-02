import React, { Component, useContext } from 'react'
import { arrayOf, shape, string } from 'prop-types'

import moment from 'moment'
import { AppContext } from '../../AppContext'

export const RoundsBanner = () => {
  const { tournament } = useContext(AppContext)

  const dateRangeString = (start: string, end: string) => {
    const startDate = moment(start)
    const endDate = moment(end)
    let dateStr = startDate.format('MMM D')

    if (endDate > startDate) {
      dateStr += `-${endDate.format('D')}`
    }

    return dateStr
  }

  const reverseRounds = Array.from(tournament.rounds).reverse()
  reverseRounds.shift()

  const rounds = Array.from(tournament.rounds).concat(reverseRounds)

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
              {dateRangeString(r.startDate, r.endDate)}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}
