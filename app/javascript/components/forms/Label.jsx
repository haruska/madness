import React from 'react'
import InputError from './InputError'

function Label(props) {
  let { attr, text, errors } = props

  return (
    <label name={attr} htmlFor={attr}>
      {text}
      <InputError attr={attr} errors={errors} />
    </label>
  )
}

export default Label
