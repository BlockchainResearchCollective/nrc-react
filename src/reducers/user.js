import { REQUEST_LOGIN_STATUS, RESPONSE_LOGIN_STATUS, REQUEST_LOGIN, RESPONSE_LOGIN } from '../actions/'

const initialState = {
	isFetching: false,
	loggedIn: false,
 	profile: {},
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
		default:
			return state
	}
}

export default userProfile
