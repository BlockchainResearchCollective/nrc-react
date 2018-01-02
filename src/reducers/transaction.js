import {
  PROCESS_START, PROCESS_END, INITIALIZE_START, INITIALIZE_END,
  CHECK_URL, UPDATE_IMAGE, UPDATE_CREDIBILITY,
  UPDATE_STORE_EXIST, UPDATE_OVERALL_SCORE, UPDATE_REVIEW_AMOUNT,
  UPDATE_ALL_REVIEWS, UPDATE_MY_REVIEW_INDEX,
  READ_REVIEWS_START, READ_REVIEWS_END
} from '../actions/ActionTypes'

const initialState = {
	isReady: false,
  isProcessing: false,
  storeSelected: false,
  storeExist: false,
  storeURL: "",
  storeName: "Nanyang Review Chain",
  storeId: "",
  storeOverallScore: 0,
  reviewAmount: 0,
  credibility: 0,
  reviews: [],
  myReviewIndex: -1,
  reviewReady: false
}

const transactionReducer = (state = initialState, action) => {
	switch(action.type){
    case INITIALIZE_START:
			return {
				...state,
				isReady: false
			}
    case INITIALIZE_END:
			return {
				...state,
				isReady: true
			}
    case PROCESS_START:
			return {
				...state,
				isProcessing: true
			}
    case PROCESS_END:
			return {
				...state,
				isProcessing: false
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
    case READ_REVIEWS_START:
     return {
       ...state,
       reviewReady: false
     }
    case READ_REVIEWS_END:
      return {
        ...state,
        reviewReady: true
      }
    case UPDATE_ALL_REVIEWS:
      return {
        ...state,
        reviews: action.reviews
      }
    case UPDATE_MY_REVIEW_INDEX:
      return {
        ...state,
        myReviewIndex: action.index
      }
    default:
			return state
	}
}

export default transactionReducer
