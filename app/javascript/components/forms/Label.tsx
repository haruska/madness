import React from 'react'
import { InputError } from './InputError'

export const Label = ({
  attr,
  text,
  errors,
}: {
  attr: string
  text: string
  errors?: string[]
}) => {
  return (
    <label htmlFor={attr}>
      {text}
      <InputError attr={attr} errors={errors} />
    </label>
  )
}
