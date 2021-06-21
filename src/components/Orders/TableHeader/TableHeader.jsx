import React from 'react'
import { TrHeader, Th } from './TableHeader.elements'

const TableHeader = (props) => {
  return (
    <TrHeader>
      {props.elems.map((elem, index) => (
        <Th key={elem + index}>{elem}</Th>
      ))}
    </TrHeader>
  )
}

export default TableHeader
