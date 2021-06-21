import React from 'react'
import { Tr, Td, DeleteBtn } from './TableContent.elements'
import { formatDate, formatPrice } from '../../../redux/utils'

const TableContent = (props) => {
  return (
    <div>
      {props.localData.map((item) => (
        <Tr key={item.id}>
          <Td>{formatDate(item.date)}</Td>
          <Td>{item.hour}</Td>
          <Td>{formatPrice(item.city.price)} &#8381;</Td>
          <Td>{item.city.name + ', ' + item.city.address}</Td>
          <DeleteBtn onClick={() => props.deleteHandler(item.id)}>
            Удалить
          </DeleteBtn>
        </Tr>
      ))}
    </div>
  )
}

export default TableContent
