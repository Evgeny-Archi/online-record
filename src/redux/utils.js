export function formatDate(key) {
  // Суббота, 1 июля
  const date = new Date(key)
  const localeDate = date.toLocaleString('ru-Ru', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return localeDate.charAt(0).toUpperCase() + localeDate.substring(1)
}

export function formatTel(tel) {
  // +1 (123) 456-78-90
  const format = '+_ (___) ___-__-__'.split('')
  let formatedTel = ''
  let count = 0

  for (let i = 0; i < format.length; i++) {
    if (format[i] === '_') {
      formatedTel += tel[count]
      count++
    } else {
      formatedTel += format[i]
    }
  }

  return formatedTel
}

export function formatPrice(price) {
  // 1 000,00
  return new Intl.NumberFormat('ru-RU').format(price)
}

export function validateControl(validate, value) {
  if (!validate.required) {
    return true
  }

  let valid = true

  if (validate.minLength) {
    valid = value.trim().length >= validate.minLength && valid
  }

  return valid
}

export function getCityIdByName(data = [], name) {
  let id = ''
  data.forEach((item) => {
    if (item.name === name) {
      id = item.id
    }
  })

  return id
}

export function checkValid(formControls) {
  // Пробегаемся по массиву значений для каждого элемента формы
  const validate = Object.values(formControls).every((control) => {
    // Если поле обязательное - возвращаем frue || false из свойства valid
    if (control.validation.required) {
      return control.validation.valid
    } else {
      return true
    }
  })

  return validate
}

export function splitDateAndHours(data) {
  // Обрабатываем JSON c датами и часами
  const dates = []
  const hours = {}
  // Итерируемся по массиву [["date", {...hours}], ["date", {...hours}], ...], где key = date, value = hours
  for (const [key, value] of Object.entries(data)) {
    // Проверяем каждый элемент массива [{hour}, {hour}, ...] на is_not_free: true
    if (Object.values(value).every((elem) => elem.is_not_free)) {
      // Пропускаем даты, в которых все часы is_not_free: true
      continue
    } else {
      // Пушим свободные даты
      dates.push({
        id: key,
        name: formatDate(key),
      })

      /* Обрабатываем часы */
      const tempArrayWithHours = []
      // Итерируемся по массиву с часами [{day: '', begin: '', end: '', is_not_free: bool}, {...}, ...]
      for (let hourElem of Object.values(value)) {
        // Если элемент массива elem.is_not_free: false - пушим во временный массив со свободными часами
        if (!hourElem.is_not_free) {
          tempArrayWithHours.push({
            id: hourElem.date,
            name: `${hourElem.begin}-${hourElem.end}`,
            details: hourElem,
          })
        }
      }
      // Записываем в объект с часами ключ '2020-02-10' и значение [{id: '2020-10-02 15:00', name: '15:00 - 16:00', details: {...}}]
      hours[key] = tempArrayWithHours
    }
  }
  return { dates, hours }
}

export const getDataFromLocalStorage = () => {
  const localData = window.localStorage.getItem('online-record')
  if (localData) {
    return JSON.parse(localData)
  } else {
    return false
  }
}
