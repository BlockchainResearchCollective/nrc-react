import {
	REQUEST_LOGIN_STATUS, RESPONSE_LOGIN_STATUS, REQUEST_LOGIN, RESPONSE_LOGIN,
	REQUEST_ETH_BALANCE, RESPONSE_ETH_BALANCE
} from '../actions/'

const initialState = {
	isFetching: false,
	loggedIn: false,
 	profile: {},
 	ethBalance: 0
}

const userProfile = (state = {initialState}, action) => {
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

export default userProfile
