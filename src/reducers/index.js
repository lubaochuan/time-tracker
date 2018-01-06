import { combineReducers } from 'redux'
import { main } from './main'
import { reducer as formReducer } from 'redux-form'

const allReducers = combineReducers({
  main,
  form: formReducer
})

export default allReducers
