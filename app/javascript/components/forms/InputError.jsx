import React from 'react'

const styles = {
  inputError: {
    color: 'darkred',
  },
}

function InputError(props) {
  let { attr, errors } = props
  if (errors) {
    let attrError = errors.find((e) => e.path[0] === attr)
    if (attrError) {
      return <span style={styles.inputError}>&nbsp;{attrError.message}</span>
    }
  }

  return null
}

export default InputError
