import React, { useEffect, useState } from 'react'
import { MutationErrors } from 'components/NewBracket'

export const ErrorFlash = ({
  errors,
  message = 'There was an issue. See below.',
  objectType = 'Below',
}: {
  errors?: MutationErrors
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
      const baseError = errors.find((error) => error.path[0] === 'base')
      if (baseError) {
        return `${objectType} ${baseError.message}`
      }
    }
    return message
  }

  if (visible) {
    return <div className="flash-error">{formattedMessage()}</div>
  }

  return null
}
