import React from 'react'

const styles = {
  inputError: {
    color: 'darkred',
  },
}

export const InputError = ({ attr, errors }: { attr: string; errors?: string[] }) => {
  // if (errors) {
  //   let attrError = errors.find((e) => e.path[0] === attr)
  //   if (attrError) {
  //     return <span style={styles.inputError}>&nbsp;{attrError.message}</span>
  //   }
  // }

  return null
}
