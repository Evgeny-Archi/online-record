import React from 'react'
import { ButtonElem } from './Button.elements'

const Button = (props) => {
  return (
    <ButtonElem type="submit" disabled={props.disabled}>
      {props.children}
    </ButtonElem>
  )
}

export default Button
