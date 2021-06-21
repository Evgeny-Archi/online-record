import React from 'react'
import { FotterWrap } from './Footer.elements'

const Footer = () => {
  return (
    <FotterWrap>
      Нажимая &#171;Записаться&#187;, я выражаю своё согласие с обработкой моих
      персональных данных в соответствии с принятой{' '}
      <a href={'/#'}>политикой конфиденциальности</a> и принимаю{' '}
      <a href={'/#'}>пользовательское соглашение</a>
    </FotterWrap>
  )
}

export default Footer
