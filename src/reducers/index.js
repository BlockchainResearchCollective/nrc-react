import { combineReducers } from 'redux'
import user from './user'
import system from './system'
import transaction from './transaction'

const rootReducer = combineReducers({
	user, system, transaction
})

export default rootReducer
