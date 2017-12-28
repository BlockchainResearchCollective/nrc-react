import {

} from '../actions/'

const initialState = {
	inProcess: false,
  storeExist: false,
  storeOverallScore: 0,
  reviewAmount: 0
}

const transactionReducer = (state = initialState, action) => {
	switch(action.type){
    /* case CLEAR_MESSAGE:
			return {
				...state,
				message: ""
			} */
    default:
			return state
	}
}

export default transactionReducer
