import React from 'react'
import { InputError } from './InputError'
import { MutationErrors } from 'containers/NewBracket'

export const Label = ({
  attr,
  text,
  errors,
}: {
  attr: string
  text: string
  errors: MutationErrors
}) => {
  return (
    <label htmlFor={attr}>
      {text}
      <InputError attr={attr} errors={errors} />
    </label>
  )
}
