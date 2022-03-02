import React from 'react'
import { Team } from 'AppContext'

export const FinalFourTeam = ({ team }: { team: Team }) => <td key={team.id}>{team.name}</td>
