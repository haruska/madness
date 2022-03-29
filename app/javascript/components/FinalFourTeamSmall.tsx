import React from 'react'
import { Team } from 'AppContext'

export const FinalFourTeamSmall = ({ team }: { team: Team }) => (
  <div className="final-four-team-small-component">
    {team.stillPlaying ? team.name : <span className="eliminated">{team.name}</span>}
  </div>
)
