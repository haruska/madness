import React from 'react'

export const TableHeader = ({ showEliminated }: { showEliminated?: boolean }) => {
  const headings = showEliminated
    ? ['', 'Name', 'Score', 'Possible', 'Best', 'Final Four', 'Final Four', 'Second', 'Winner']
    : ['', 'Name', 'Score', 'Possible', 'Final Four', 'Final Four', 'Second', 'Winner']

  return (
    <thead>
      <tr>
        {headings.map((heading, i) => (
          <th key={`heading-${i}`}>{heading}</th>
        ))}
      </tr>
    </thead>
  )
}
