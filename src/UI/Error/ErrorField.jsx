import React from 'react'
import { ErrorWrap, ErrorText } from './ErrorField.elements'

const Error = (props) => {
  return (
    <ErrorWrap>
      {props.isShow ? <ErrorText>{props.errorMessage}</ErrorText> : null}
    </ErrorWrap>
  )
}

export default Error
