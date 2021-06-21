import React from 'react'
import {
  SelectContainer,
  Title,
  TitleText,
  TitleArrow,
} from './Select.elements'
import SpinnerSVG from '../SpinnerSVG/SpinnerSVG'
import DropdownComponent from './Dropdown'

const Select = ({ element, onChange, onBlur, isError }) => {
  const [isOpen, setOpen] = React.useState(false)
  const dropdownRef = React.useRef(null)

  const toggleDropdown = (e) => {
    e.preventDefault()
    setOpen(!isOpen)
  }

  const closeDropdown = () => {
    setOpen(false)
  }

  const onChangeHandler = (e) => {
    closeDropdown()
    const value = e.target.dataset.value || e.target.value
    if (value !== element.value) {
      onChange(element.name, value)
    }
  }

  const currentValueToText = () => {
    if (element.value) {
      return element.items.find((item) => item.id === element.value).name
    } else {
      return element.placeholder || 'Выберите...'
    }
  }

  const onBlurHandler = (e) => {
    // Если клик произошел не по dropdown'у и была передана фу-ция обработчик
    if (e.relatedTarget === null && onBlur !== undefined) {
      onBlur()
    }
  }

  if (element.error) {
    console.log(element.error)
    return (
      <SelectContainer isError={element.error}>
        <Title style={{ color: '#e23745' }}>Ошибка при загрузке данных</Title>
      </SelectContainer>
    )
  }

  return (
    <>
      <SelectContainer
        ref={dropdownRef}
        tabIndex="0"
        onBlur={onBlurHandler}
        isOpen={isOpen}
        isError={isError}
      >
        {element.isLoading ? (
          <Title>
            <SpinnerSVG width="30px" height="30px" />
          </Title>
        ) : (
          <Title>
            <TitleText
              onClick={toggleDropdown}
              tabIndex="0"
              isChecked={!!element.value}
              isError={isError}
            >
              {currentValueToText()}
            </TitleText>
            <TitleArrow
              isOpen={isOpen}
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.429.253a.819.819 0 0 0-1.184 0 .883.883 0 0 0 0 1.22l4.142 4.274A.821.821 0 0 0 5 6a.821.821 0 0 0 .612-.253l4.143-4.273a.883.883 0 0 0 0-1.221.819.819 0 0 0-1.184 0L5 3.937 1.429.253z"
                fill="currentColor"
              ></path>
            </TitleArrow>
          </Title>
        )}

        {isOpen && element.items && (
          <DropdownComponent
            element={element}
            ref={dropdownRef}
            onClick={onChangeHandler}
            closeDropdown={closeDropdown}
          />
        )}
      </SelectContainer>

      {/* <select
        value={element.value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      >
        {element.placeholder && (
          <option value="" disabled>
            {element.placeholder}
          </option>
        )}

        {element.items &&
          element.items.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
      </select> */}
    </>
  )
}

export default Select
