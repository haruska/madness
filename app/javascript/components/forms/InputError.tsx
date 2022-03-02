import React from 'react'
import { MutationErrors } from 'containers/NewBracket'

const styles = {
  inputError: {
    color: 'darkred',
  },
}

export const InputError = ({ attr, errors }: { attr: string; errors: MutationErrors }) => {
  if (errors) {
    let attrError = errors.find((e) => e.path[0] === attr)
    if (attrError) {
      return <span style={styles.inputError}>&nbsp;{attrError.message}</span>
    }
  }

  return null
}
