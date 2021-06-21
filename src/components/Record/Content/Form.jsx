import React from 'react'
import { Link } from 'react-router-dom'
import CitiesContainer from './CitiesContainer/CitiesContainer'
import DatesContainer from './DatesContainer/DatesContainer'
import InputsContainer from './InputsContainer/InputsContainer'
import ButtonElem from '../../../UI/Button/Button'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchCities,
  fetchDates,
  changeValue,
  checkValidForm,
  sendFormData,
} from '../../../redux/actions/form'
import {
  FormElem,
  Backdrop,
  ButtonWrap,
  SuccessParagraph,
} from './Form.elements'

const Form = ({ isLoading }) => {
  const dispatch = useDispatch()
  const [success, setSuccess] = React.useState(false)
  const formValid = useSelector((state) => state.form.isValid)
  const formTouched = useSelector((state) => state.form.touched)

  React.useEffect(() => {
    async function getCitiesAndDates() {
      await dispatch(fetchCities())
      await dispatch(fetchDates())
    }
    getCitiesAndDates()
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formValid) {
      // Ждем отправки данных
      await dispatch(sendFormData())
      // Показываем сообщение об успешной отправке
      setSuccess(true)
    }
  }

  const onChange = (name, value) => {
    dispatch(changeValue(name, value))
  }

  const onBlur = () => {
    dispatch(checkValidForm())
  }

  return (
    <>
      {success && (
        <SuccessParagraph>
          &#10004; Данные успешно отправлены. Посмотреть{' '}
          <Link to="/orders">запись</Link>
        </SuccessParagraph>
      )}

      <FormElem onSubmit={handleSubmit}>
        {isLoading && <Backdrop />}
        <CitiesContainer onChange={onChange} onBlur={onBlur} />
        <DatesContainer
          onChange={onChange}
          onBlur={onBlur}
          isFormTouched={formTouched}
        />
        <InputsContainer
          onChange={onChange}
          onBlur={onBlur}
          isFormTouched={formTouched}
        />
        <ButtonWrap>
          <ButtonElem disabled={!formValid}>Записаться</ButtonElem>
        </ButtonWrap>
      </FormElem>
    </>
  )
}

export default Form
