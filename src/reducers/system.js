import {
	ALERT_MESSAGE, CLEAR_MESSAGE
} from '../actions/'

const initialState = {
	message: ""
}

const systemReducer = (state = initialState, action) => {
	switch(action.type){
    case ALERT_MESSAGE:
			return {
				...state,
				message: action.message
			}
		case CLEAR_MESSAGE:
			return {
				...state,
				message: ""
			}
    default:
			return state
	}
}

export default systemReducer
