import reduceReducers from 'reduce-reducers'
import {
	REQUEST_LOGIN_STATUS, RESPONSE_LOGIN_STATUS, REQUEST_LOGIN, RESPONSE_LOGIN,
	REQUEST_ETH_BALANCE, RESPONSE_ETH_BALANCE, REQUEST_LOGOUT, RESPONSE_LOGOUT,
	REQUEST_RESET_PASSWORD, RESPONSE_RESET_VERIFY, RESPONSE_PASSWORD_CHANGE, RESET_EXPIRED
} from '../actions/ActionTypes'

const initialState = {
	isFetching: false,
	loggedIn: false,
 	profile: {},
 	ethBalance: undefined,
	resetPassword: false,
	resetVerified: false,
	passwordChanged: false
}

const userProfileReducer = (state = initialState, action) => {
	switch(action.type){
		case REQUEST_LOGIN_STATUS:
			return {
				...state,
				isFetching: true
			}
		case RESPONSE_LOGIN_STATUS:
			return {
				...state,
				isFetching: false,
				profile: action.profile,
				loggedIn: action.status === 'success'
			}
		case REQUEST_LOGIN:
			return {
				...state,
				isFetching: true
			}
		case RESPONSE_LOGIN:
			return {
				...state,
				isFetching: false
			}
		case REQUEST_LOGOUT:
			return {
				...state,
				isFetching: true
			}
		case RESPONSE_LOGOUT:
			return {
				...state,
				isFetching: false
			}
		case REQUEST_ETH_BALANCE:
			return {
				...state,
				isFetching: true
			}
		case RESPONSE_ETH_BALANCE:
			return {
				...state,
				isFetching: false,
				ethBalance: action.ethBalance
			}
		default:
			return state
	}
}

const resetPasswordReducer = (state, action) =>{
	switch(action.type){
		case REQUEST_RESET_PASSWORD:
			return {
				...state,
				resetPassword: true
			}
		case RESPONSE_RESET_VERIFY:
			if (action.status === 200){
				return {
					...state,
					resetVerified: true
				}
			}
		case RESPONSE_PASSWORD_CHANGE:
			if (action.status === 200){
				return {
					...state,
					passwordChanged: true,
					resetPassword: false
				}
			}
		case RESET_EXPIRED:
			return {
				...state,
				resetPassword: false,
				resetVerified: false,
				passwordChanged: false
			}
		default:
			return state
	}
}

const userReducer = reduceReducers(userProfileReducer, resetPasswordReducer)
export default userReducer
