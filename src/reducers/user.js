import reduceReducers from 'reduce-reducers'
import {
	REQUEST_LOGIN_STATUS, RESPONSE_LOGIN_STATUS, REQUEST_LOGIN, RESPONSE_LOGIN,
	REQUEST_ETH_BALANCE, RESPONSE_ETH_BALANCE, REQUEST_LOGOUT, RESPONSE_LOGOUT,
	REQUEST_RESET_PASSWORD, RESPONSE_RESET_VERIFY, RESPONSE_PASSWORD_CHANGE
} from '../actions/'

const initialState = {
	isFetching: false,
	loggedIn: false,
 	profile: {},
 	ethBalance: 0,
 	resetPassword: false,
	resetVerified: false,
	passwordChanged: false
}

const userProfileReducer = (state = {initialState}, action) => {
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

const resetPasswordReducer = (state={initialState}, action) =>{
	switch(action.type){
		case REQUEST_RESET_PASSWORD:
			return {
				// specifying all states because user could resend password reset request
				// which requires all states to be restored to default
				resetPassword: true,
				resetVerified: false,
				passwordChanged: false
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
		default:
			return state
	}
}

const userReducer = reduceReducers(userProfileReducer, resetPasswordReducer)
export default userReducer
