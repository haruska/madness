import React, { useEffect, useState } from 'react'
import { BracketErrors } from '../NewBracket'

export const ErrorFlash = ({
  errors,
  message = 'There was an issue. See below.',
  objectType = 'Below',
}: {
  errors?: BracketErrors
  message?: string
  objectType?: string
}) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 5000)

    return () => {
      if (timer) clearTimeout(timer)
    }
  })

  const formattedMessage = () => {
    if (errors) {
      const baseError = errors['base']
      if (baseError) {
        return `${objectType} ${baseError.join('; ')}`
      }
    }
    return message
  }

  if (visible) {
    return <div className="flash-error">{formattedMessage()}</div>
  }

  return null
}
