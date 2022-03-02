import React from 'react'

const styles = {
  paddingTop: '100px',
  textAlign: 'center' as const,
}

export const NotFound = () => (
  <div style={styles}>
    <h3>Sorry, page not found!</h3>
  </div>
)
