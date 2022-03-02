import React from 'react'

export const Dialog = ({
  isOpen,
  message,
  onCancel,
  onConfirm,
}: {
  isOpen: boolean
  message: string
  onConfirm: () => void
  onCancel: () => void
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="dialog-component">
      <div className="dialog">
        <div className="dialog-title">
          <p>{message}</p>
        </div>

        <div className="dialog-actions">
          <button className="dialog-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="dialog-confirm delete" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
