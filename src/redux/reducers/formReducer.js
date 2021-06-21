import {
  SET_DATES_FROM_DATA,
  SET_LOADING_DATE,
  SET_DATE_ERROR,
  SET_CITIES_FROM_DATA,
  SET_LOADING_CITY,
  SET_CITY_ERROR,
  SET_FORM_VALID,
  CHANGE_VALUE,
  RESET_FORM,
  SET_LOADING_FORM,
} from '../actions/actionTypes'
import { splitDateAndHours, validateControl } from '../utils'

const initialState = {
  isValid: false,
  isLoading: false,
  touched: false,
  structure: {
    cities: {
      type: 'select',
      name: 'cities',
      value: '',
      items: [],
      isLoading: false,
      error: false,
      validation: {
        required: true,
        valid: false,
        errorMessage: 'Пожалуйста, выберите город',
      },
    },
    dates: {
      type: 'select',
      name: 'dates',
      value: '',
      items: [],
      isLoading: false,
      placeholder: 'Дата',
      error: false,
      validation: {
        required: true,
        valid: false,
        errorMessage: 'Пожалуйста, выберите дату и время',
      },
    },
    hours: {
      type: 'select',
      name: 'hours',
      value: '',
      items: {},
      placeholder: 'Время',
      validation: {
        required: true,
        valid: false,
        errorMessage: 'Пожалуйста, выберите время',
      },
    },
    phone: {
      type: 'tel',
      name: 'phone',
      value: '',
      placeholder: '+7 (___) ___-__-__',
      validation: {
        required: true,
        valid: false,
        errorMessage:
          'Пожалуйста, введите корректный телефон, иначе наши специалисты не смогут связаться с вами',
        minLength: 17,
      },
    },
    userName: {
      type: 'text',
      name: 'userName',
      value: '',
      placeholder: 'Ваше имя',
      validation: {
        required: true,
        valid: false,
        errorMessage: 'Пожалуйста, укажите имя',
        minLength: 2,
      },
    },
  },
}

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CITIES_FROM_DATA:
      // Записываем в items массив с городами
      return {
        ...state,
        structure: {
          ...state.structure,
          cities: {
            ...state.structure.cities,
            items: action.payload.cities,
            value: action.payload.defaultCity,
            validation: {
              ...state.structure.cities.validation,
              valid: true,
            },
          },
        },
      }
    case SET_LOADING_CITY:
      // Устанавливаем прелоадер (action.payload = true || false)
      return {
        ...state,
        structure: {
          ...state.structure,
          cities: {
            ...state.structure.cities,
            isLoading: action.payload,
          },
        },
      }
    case SET_CITY_ERROR:
      // Записываем ошибку, останавливаем прелоадер
      return {
        ...state,
        structure: {
          ...state.structure,
          cities: {
            ...state.structure.cities,
            error: action.payload,
            isLoading: false,
          },
        },
      }
    case CHANGE_VALUE:
      const newState = { ...state }

      if (action.payload.name === 'cities' || action.payload.name === 'dates') {
        // Сбрасываем часы при смене города или даты
        const resetHours = { ...newState.structure.hours, value: '' }
        const resetHourValid = {
          ...newState.structure.hours.validation,
          valid: false,
        }
        newState.structure.hours = resetHours
        newState.structure.hours.validation = resetHourValid
      }
      if (action.payload.name === 'cities') {
        // Сбрасываем даты при смене города
        const resetDates = { ...newState.structure.dates, value: '' }
        const resetDateValid = {
          ...newState.structure.dates.validation,
          valid: false,
        }
        newState.structure.dates = resetDates
        newState.structure.dates.validation = resetDateValid
      }

      // Обновляем value элемента формы [action.payload.name] из action.payload.value
      const control = {
        ...newState.structure[action.payload.name],
        value: action.payload.value,
      }
      const controlValid = {
        ...newState.structure[action.payload.name].validation,
      }
      // Проверяем введенные данные при каждом изменении данных
      controlValid.valid = validateControl(
        newState.structure[action.payload.name].validation,
        action.payload.value
      )
      newState.structure[action.payload.name] = control
      newState.structure[action.payload.name].validation = controlValid

      return {
        ...newState,
      }
    case SET_DATES_FROM_DATA:
      // Разбиваем даты и часы из JSON
      const { dates, hours } = splitDateAndHours(action.payload)
      return {
        ...state,
        structure: {
          ...state.structure,
          dates: {
            ...state.structure.dates,
            items: dates,
          },
          hours: {
            ...state.structure.hours,
            items: hours,
          },
        },
      }
    case SET_LOADING_DATE:
      return {
        ...state,
        structure: {
          ...state.structure,
          dates: {
            ...state.structure.dates,
            isLoading: action.payload,
          },
        },
      }
    case SET_DATE_ERROR:
      return {
        ...state,
        structure: {
          ...state.structure,
          dates: {
            ...state.structure.dates,
            error: action.payload,
            isLoading: false,
          },
        },
      }
    case SET_FORM_VALID:
      return {
        ...state,
        isValid: action.payload,
        touched: true,
      }
    case RESET_FORM:
      // Сохраняем данные о городах и датах, чтобы не загружать заново
      const initialStateCopy = {
        ...initialState,
        structure: {
          ...initialState.structure,
          cities: state.structure.cities,
          dates: {
            ...initialState.structure.dates,
            items: state.structure.dates.items,
          },
          hours: {
            ...initialState.structure.hours,
            items: state.structure.hours.items,
          },
        },
      }
      return initialStateCopy
    case SET_LOADING_FORM:
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state
  }
}

export default formReducer

/*
Формат городов:
  items: [
    {
      id: 5b348105320000781bd1e422,
      name: 'Приморск',
      address: 'ул. Малая 9',
      phones: ['79990010101'],
      price: 1000
    },
  ...]
*/

/*
Формат Дат: 
  dates: [
    {
      id: '2020-12-02',
      name: 'Суббота, 1 июля'
    },
    ...
  ]
Формат Часов: 
  hours: {
      2020-12-02: [
        {id: '2018-20-02 15:00:00', name: '15:00 - 16:00', details: {day: '', begin: '', end: ''}},
        ...
      ],
      ...
    }
*/
