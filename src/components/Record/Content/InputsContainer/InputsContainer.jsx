import React from 'react'
import Input from '../../../../UI/Input/Input'
import ErrorField from '../../../../UI/Error/ErrorField'
import { useSelector } from 'react-redux'

const InputsContainer = (props) => {
  const phone = useSelector((state) => state.form.structure.phone)
  const userName = useSelector((state) => state.form.structure.userName)

  const onChangeTelMask = (name, value) => {
    if (value.match(/[a-zA-Z]/)) {
      return
    }

    let numbersValue = value.replace(/\D/g, '')
    let formatedValue = ''

    if (phone.value < value) {
      if (['7', '8', '9'].includes(numbersValue[0])) {
        if (numbersValue[0] === '9') numbersValue = '7' + numbersValue
        let firstSymbol = numbersValue[0] === '8' ? '8' : '+7'
        formatedValue = firstSymbol + ' '
        if (numbersValue.length > 1) {
          formatedValue += '(' + numbersValue.substring(1, 4)
        }
        if (numbersValue.length >= 5) {
          formatedValue += ') ' + numbersValue.substring(4, 7)
        }
        if (numbersValue.length >= 8) {
          formatedValue += '-' + numbersValue.substring(7, 9)
        }
        if (numbersValue.length >= 10) {
          formatedValue += '-' + numbersValue.substring(9, 11)
        }
      } else {
        formatedValue = '+' + numbersValue
      }
    } else {
      formatedValue = value
    }

    props.onChange(name, formatedValue)
  }

  return (
    <>
      <Input
        element={phone}
        onChange={onChangeTelMask}
        onBlur={props.onBlur}
        isError={props.isFormTouched && !phone.validation.valid}
      />
      <ErrorField
        isShow={
          props.isFormTouched &&
          phone.validation.required &&
          !phone.validation.valid
        }
        errorMessage={phone.validation.errorMessage}
      />
      <Input
        element={userName}
        onChange={props.onChange}
        onBlur={props.onBlur}
        isError={props.isFormTouched && !userName.validation.valid}
      />
      <ErrorField
        isShow={
          props.isFormTouched &&
          userName.validation.required &&
          !userName.validation.valid
        }
        errorMessage={userName.validation.errorMessage}
      />
    </>
  )
}

export default InputsContainer
