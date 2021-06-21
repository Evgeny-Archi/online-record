import React from 'react'
import { InputElem } from './Input.elements'

const Input = ({ element, onChange, onBlur, isError }) => {
  const onChangeHandler = (e) => {
    onChange(element.name, e.target.value)
  }

  return (
    <InputElem
      type={element.type}
      value={element.value}
      placeholder={element.placeholder}
      onChange={onChangeHandler}
      onBlur={onBlur}
      tabIndex="0"
      isError={isError}
      isValid={element.validation.valid}
    />
  )
}

export default Input
