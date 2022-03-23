// http://stackoverflow.com/questions/15998005/ordinals-in-words-javascript
export function ordinalInWord(cardinal: number): string {
  const ordinals = [
    'Zeroth',
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
    'Sixth',
    'Seventh',
    'Eighth',
    'Ninth',
    'Tenth',
  ]
  return ordinals[cardinal]
}

export function ordinalInNumber(cardinal: number): string {
  const ordinals = ['0th', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th']
  return ordinals[cardinal]
}
