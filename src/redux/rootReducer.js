import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import formReducer from './reducers/formReducer'

const reducers = combineReducers({
  form: formReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

window.store = store

export default store
