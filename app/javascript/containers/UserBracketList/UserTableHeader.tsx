import React from 'react'

export const UserTableHeader = ({ bracketCount }: { bracketCount: number }) => {
  if (bracketCount > 0) {
    let headings = ['Name', 'Final Four', 'Final Four', 'Second', 'Winner', 'Tie', 'Status']
    return (
      <thead>
        <tr>
          {headings.map((heading, i) => (
            <th key={`heading-${i}`}>{heading}</th>
          ))}
        </tr>
      </thead>
    )
  } else {
    return null
  }
}
