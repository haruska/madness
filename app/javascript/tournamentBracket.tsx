import React from 'react'
import { createRoot } from 'react-dom/client';

const TourneyBracket = () => {
  return (
    <div className="tourney-bracket">
      <p>Hello from React!</p>
    </div>
  )
}

const domNode = document.getElementById('tournament-render')
const root = createRoot(domNode);
root.render(<TourneyBracket />);
