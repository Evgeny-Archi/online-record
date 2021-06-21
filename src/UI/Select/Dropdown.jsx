import React from 'react'
import { Dropdown, DropdownItem } from './Select.elements'

const DropdownComponent = React.forwardRef((props, ref) => {
  React.useEffect(() => {
    // Закрываем выпадающее меню если клик произошел на свободной области
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        props.closeDropdown()
      }
    }

    document.body.addEventListener('click', handleOutsideClick)
    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  })

  return (
    <Dropdown>
      {props.element.items.map((option) => (
        <DropdownItem
          key={option.id}
          data-value={option.id}
          onClick={props.onClick}
          className={option.id === props.element.value ? 'active' : ''}
        >
          {option.name}
        </DropdownItem>
      ))}
    </Dropdown>
  )
})

export default DropdownComponent
