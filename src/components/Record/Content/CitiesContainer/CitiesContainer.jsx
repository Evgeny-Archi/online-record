import React from 'react'
import Select from '../../../../UI/Select/Select'
import CityDetails from './CityDetails'
import { useSelector } from 'react-redux'

const CitiesContainer = (props) => {
  const cities = useSelector((state) => state.form.structure.cities)
  const details = cities.items.find((city) => city.id === cities.value)

  return (
    <>
      <Select
        element={cities}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      <CityDetails isLoading={cities.isLoading} details={details} />
    </>
  )
}

export default CitiesContainer
