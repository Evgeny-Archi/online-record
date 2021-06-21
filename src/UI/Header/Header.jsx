import React from 'react'
import { Wrap, Title } from './Header.elements'
import HeaderLogo from '../Logo/Logo'

const Header = ({ title, isLoading }) => {
  return (
    <Wrap>
      <HeaderLogo loading={isLoading} />
      <Title>{title}</Title>
    </Wrap>
  )
}

export default Header
