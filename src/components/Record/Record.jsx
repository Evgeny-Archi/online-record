import React from 'react'
import { Wrap } from './Record.elements'
import Header from '../../UI/Header/Header'
import Form from './Content/Form'
import Footer from './Footer/Footer'
import { useSelector } from 'react-redux'

const Record = () => {
  const isLoading = useSelector((state) => state.form.isLoading)

  return (
    <Wrap>
      <Header title="Онлайн запись" isLoading={isLoading} />
      <Form isLoading={isLoading} />
      <Footer />
    </Wrap>
  )
}

export default Record
