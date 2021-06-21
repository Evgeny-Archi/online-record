import {
  SET_CITIES_FROM_DATA,
  SET_LOADING_CITY,
  SET_CITY_ERROR,
  SET_DATES_FROM_DATA,
  SET_LOADING_DATE,
  SET_DATE_ERROR,
  SET_FORM_VALID,
  CHANGE_VALUE,
  RESET_FORM,
  SET_LOADING_FORM,
} from './actionTypes'
import { getCityIdByName, checkValid } from '../utils'

const DEFAULT_CITY = 'Владивосток'

// Получаем список городов
export function fetchCities() {
  return async (dispatch) => {
    try {
      dispatch(setLoadingCities(true))

      const response = await fetch(
        'https://www.mocky.io/v2/5b34c0d82f00007400376066?mocky-delay=700ms'
      )
      const data = await response.json()
      // Устанавливаем город по умолчанию. Если фу-ция возвращает пустую строку (DEFAULT_CITY = ''), то берем первый город из списка
      const defaultCity =
        getCityIdByName(data.cities, DEFAULT_CITY) || data.cities[0].id

      dispatch(setCities(data.cities, defaultCity))
      dispatch(setLoadingCities(false))
    } catch (err) {
      dispatch(setCityError(err))
    }
  }
}

function setLoadingCities(bool) {
  return {
    type: SET_LOADING_CITY,
    payload: bool,
  }
}

function setCities(cities, defaultCity) {
  return {
    type: SET_CITIES_FROM_DATA,
    payload: {
      cities,
      defaultCity,
    },
  }
}

function setCityError(error) {
  return {
    type: SET_CITY_ERROR,
    payload: error,
  }
}

// Получаем список дат и часов по id города
export function fetchDates(cityId) {
  return async (dispatch, getState) => {
    // Если при загрузке списка городов произошла ошибка - диспатчим в даты пустой массив
    if (getState().form.structure.cities.error) {
      dispatch(setDates([]))
    } else {
      try {
        dispatch(setLoadingDates(true))
        const id = cityId || getState().form.structure.cities.value

        const response = await fetch(
          `https://www.mocky.io/v2/${id}?mocky-delay=700ms`
        )
        const dates = await response.json()

        dispatch(setDates(dates.data))
        dispatch(setLoadingDates(false))
      } catch (err) {
        dispatch(setDateError(err))
      }
    }
  }
}

function setDates(dates) {
  return {
    type: SET_DATES_FROM_DATA,
    payload: dates,
  }
}

export function setLoadingDates(bool) {
  return {
    type: SET_LOADING_DATE,
    payload: bool,
  }
}

function setDateError(error) {
  return {
    type: SET_DATE_ERROR,
    payload: error,
  }
}

export function changeValue(name, value) {
  return {
    type: CHANGE_VALUE,
    payload: {
      name,
      value,
    },
  }
}

function setFormValid(bool) {
  return {
    type: SET_FORM_VALID,
    payload: bool,
  }
}

export function checkValidForm() {
  return (dispatch, getState) => {
    const formControls = getState().form.structure

    const validate = checkValid(formControls)

    // Если все элементы формы valid = true - диспатчим общее свойство формы isValid = true
    if (validate) {
      dispatch(setFormValid(true))
    } else {
      dispatch(setFormValid(false))
    }
  }
}

function setLoadingForm(bool) {
  return {
    type: SET_LOADING_FORM,
    payload: bool,
  }
}

function resetForm() {
  return {
    type: RESET_FORM,
  }
}

export function sendFormData() {
  return (dispatch, getState) => {
    const formControls = getState().form.structure
    const validate = checkValid(formControls)

    if (validate) {
      const data = {
        id: Date.now(),
        city: formControls.cities.items.find(
          (item) => item.id === formControls.cities.value
        ),
        date: formControls.dates.value,
        hour: formControls.hours.items[formControls.dates.value].find(
          (item) => item.id === formControls.hours.value
        ).name,
        phone: formControls.phone.value,
        name: formControls.userName.value,
      }

      const localData = JSON.parse(window.localStorage.getItem('online-record'))

      if (localData) {
        localData.push(data)
        window.localStorage.setItem('online-record', JSON.stringify(localData))
      } else {
        window.localStorage.setItem('online-record', JSON.stringify([data]))
      }

      dispatch(setLoadingForm(true))

      // Имитируем отправку данных на сервер
      return new Promise((resolve) => {
        setTimeout(() => {
          // Очищаем поля формы
          dispatch(resetForm())
          dispatch(setLoadingForm(false))
          resolve()
        }, 1000)
      })
    }
  }
}
