import React from 'react'
import { InputError } from './InputError'
import { BracketErrors } from '../NewBracket'

export const Label = ({
  attr,
  text,
  errors,
}: {
  attr: string
  text: string
  errors?: BracketErrors
}) => {
  return (
    <label htmlFor={attr}>
      {text}
      <InputError attr={attr} errors={errors} />
    </label>
  )
}
