import {
  PROCESS_START, PROCESS_END, CHECK_URL, UPDATE_IMAGE, UPDATE_CREDIBILITY,
  UPDATE_STORE_EXIST, UPDATE_OVERALL_SCORE, UPDATE_REVIEW_AMOUNT
} from '../actions/ActionTypes'

const initialState = {
	isReady: false,
  storeSelected: false,
  storeExist: false,
  storeURL: "",
  storeName: "Nanyang Review Chain",
  storeId: "",
  storeOverallScore: 0,
  reviewAmount: 0,
  credibility: 0
}

const transactionReducer = (state = initialState, action) => {
	switch(action.type){
    case PROCESS_START:
			return {
				...state,
				isReady: false
			}
    case PROCESS_END:
			return {
				...state,
				isReady: true
			}
    case CHECK_URL:
			return {
				...state,
				storeSelected: action.storeSelected,
        storeName: action.storeName,
        storeId: action.storeId
			}
    case UPDATE_IMAGE:
      return {
        ...state,
        storeURL: action.storeURL
      }
    case UPDATE_CREDIBILITY:
      return {
        ...state,
        credibility: action.credibility
      }
    case UPDATE_STORE_EXIST:
      return {
        ...state,
        storeExist: action.storeExist
      }
    case UPDATE_OVERALL_SCORE:
      return {
        ...state,
        storeOverallScore: action.storeOverallScore
      }
    case UPDATE_REVIEW_AMOUNT:
      return {
        ...state,
        reviewAmount: action.reviewAmount
      }
    default:
			return state
	}
}

export default transactionReducer
