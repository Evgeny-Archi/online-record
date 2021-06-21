import React from 'react'
import Header from '../../UI/Header/Header'
import TableHeader from './TableHeader/TableHeader'
import TableContent from './TableContent/TableContent'
import { Wrap, ContentWrap, Table } from './Orders.elements'
import { getDataFromLocalStorage } from '../../redux/utils'

const Orders = () => {
  const [localData, setLocalData] = React.useState([])

  React.useEffect(() => {
    const localData = getDataFromLocalStorage()
    setLocalData(localData)
  }, [])

  const deleteOrder = (id) => {
    const updatedLocalData = localData.filter((item) => item.id !== id)
    window.localStorage.setItem(
      'online-record',
      JSON.stringify(updatedLocalData)
    )
    setLocalData(updatedLocalData)
  }

  return (
    <>
      <Wrap>
        <Header title="Список записей" />
      </Wrap>
      <ContentWrap>
        <Table>
          <TableHeader elems={['Дата', 'Время', 'Стоимость', 'Адрес']} />
          {localData && (
            <TableContent localData={localData} deleteHandler={deleteOrder} />
          )}
        </Table>
      </ContentWrap>
    </>
  )
}

export default Orders
