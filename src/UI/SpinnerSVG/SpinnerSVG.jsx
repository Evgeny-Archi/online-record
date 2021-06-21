import React from 'react'
import { Svg } from './SpinnerSVG.elements'

const SpinnerSVG = (props) => {
  return (
    <Svg size={props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" />
    </Svg>
  )
}

export default SpinnerSVG
