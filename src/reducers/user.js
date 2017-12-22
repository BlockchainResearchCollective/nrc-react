import { REQUEST_LOGIN_STATUS, RESPONSE_LOGIN_STATUS } from '../actions/'

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
		default:
			return state 
	}
}

export default userProfile