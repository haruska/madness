import React, { Component } from 'react'
import { bool, string, func } from 'prop-types'

export default class Dialog extends Component {
  static propTypes = {
    isOpen: bool.isRequired,
    message: string,
    onConfirm: func,
    onCancel: func,
  }

  render() {
    const { isOpen, message, onCancel, onConfirm } = this.props

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
}
