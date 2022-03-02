import React, { Component } from 'react'

export const BracketStatus = ({ paid }: { paid: boolean }) => {
  if (paid) {
    return <span className="badge-success">OK</span>
  }
  return <span className="badge-alert">Unpaid</span>
}
