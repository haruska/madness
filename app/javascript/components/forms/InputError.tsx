import React from 'react'
import { BracketErrors } from '../NewBracket'

const styles = {
  inputError: {
    color: 'darkred',
  },
}

export const InputError = ({ attr, errors }: { attr: string; errors?: BracketErrors }) => {
  if (errors) {
    let attrError = errors[attr]
    if (attrError) {
      return <span style={styles.inputError}>&nbsp;{attrError.join('; ')}</span>
    }
  }

  return null
}
