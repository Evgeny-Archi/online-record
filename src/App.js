import React from 'react'
import Record from './components/Record/Record'
import Orders from './components/Orders/Orders'
import { Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Record} />
      <Route path="/orders" component={Orders} />
      <Route>No match</Route>
    </Switch>
  )
}

export default App
