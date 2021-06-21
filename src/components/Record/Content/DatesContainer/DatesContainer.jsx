import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDates } from '../../../../redux/actions/form'
import Select from '../../../../UI/Select/Select'
import ErrorField from '../../../../UI/Error/ErrorField'
import { DatesWrap } from './DatesContainer.elements'

const DatesContainer = (props) => {
  const dispatch = useDispatch()
  const cityValue = useSelector((state) => state.form.structure.cities.value)
  const dates = useSelector((state) => state.form.structure.dates)
  const currentDate = useSelector((state) => state.form.structure.dates.value)

  const hours = useSelector((state) => state.form.structure.hours)
  const items = hours.items[currentDate]

  const element = { ...hours, items }

  React.useEffect(() => {
    if (cityValue) {
      dispatch(fetchDates(cityValue))
    }
  }, [dispatch, cityValue])

  // Формируем сообщение с ошибкой, в зависимости от того, выбрана ли дата
  let errorMessage = ''
  if (!dates.validation.valid && !hours.validation.valid) {
    errorMessage = dates.validation.errorMessage
  } else {
    errorMessage = hours.validation.errorMessage
  }

  return (
    <>
      <DatesWrap>
        <Select
          element={dates}
          onChange={props.onChange}
          onBlur={props.onBlur}
          isError={props.isFormTouched && !dates.validation.valid}
        />
        <Select
          element={element}
          onChange={props.onChange}
          onBlur={props.onBlur}
          isError={props.isFormTouched && !hours.validation.valid}
        />
      </DatesWrap>
      <ErrorField
        isShow={props.isFormTouched && !hours.validation.valid}
        errorMessage={errorMessage}
      />
    </>
  )
}

export default DatesContainer
