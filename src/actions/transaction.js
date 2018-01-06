import {
  PROCESS_START, PROCESS_END, INITIALIZE_START, INITIALIZE_END,
  CHECK_URL, UPDATE_IMAGE, UPDATE_CREDIBILITY, REVIEW_AMOUNT_PLUS_ONE,
  UPDATE_STORE_EXIST, UPDATE_OVERALL_SCORE, UPDATE_REVIEW_AMOUNT,
  UPDATE_ALL_REVIEWS, UPDATE_MY_REVIEW_INDEX,
  READ_REVIEWS_START, READ_REVIEWS_END, ADD_NEW_REVIEW
} from './ActionTypes'
import { getStoreNameFromUrl, getStoreIdFromUrl, searchImage, timeConverter } from '../service/util'
import {
  storeExist, readOverallScore, readCredibility, createStore, writeReview, readReview, voteReview, readVoted
} from '../service/blockchain'
import { writeHistory, addressToUsername } from '../service/backend'
import { alertMessage } from './system'
import { updateEthBalance } from './user'

/* Transaction Action Creators */

export const processStart = () => ({
	type: PROCESS_START
})
export const processEnd = () => ({
	type: PROCESS_END
})
export const initializeStart = () => ({
	type: INITIALIZE_START
})
export const initializeEnd = () => ({
	type: INITIALIZE_END
})
export const checkURL = (storeSelected, storeName, storeId) => ({
	type: CHECK_URL,
  storeSelected,
  storeName,
  storeId
})
export const updateImage = (storeURL) => ({
	type: UPDATE_IMAGE,
  storeURL
})
export const updateCredibility = (credibility) => ({
	type: UPDATE_CREDIBILITY,
  credibility
})
export const updateStoreExist = (storeExist) => ({
	type: UPDATE_STORE_EXIST,
  storeExist
})
export const updateOverallScore = (storeOverallScore) => ({
	type: UPDATE_OVERALL_SCORE,
  storeOverallScore
})
export const updateReviewAmount = (reviewAmount) => ({
	type: UPDATE_REVIEW_AMOUNT,
  reviewAmount
})
export const reviewAmountPlusOne = () => ({
  type: REVIEW_AMOUNT_PLUS_ONE
})
export const updateAllReviews = (reviews) => ({
  type: UPDATE_ALL_REVIEWS,
  reviews
})
export const updateMyReviewIndex = (index) => ({
  type: UPDATE_MY_REVIEW_INDEX,
  index
})
export const readReviewStart = () => ({
  type: READ_REVIEWS_START
})
export const readReviewEnd = () => ({
  type: READ_REVIEWS_END
})
export const addNewReview = (review) => ({
  type: ADD_NEW_REVIEW,
  review
})

export const initialize = (url, ethAddress) => dispatch => {
  dispatch(initializeStart())
  console.log("address: " + ethAddress)
  console.log(url)
  console.log(getStoreIdFromUrl(url))
  console.log(getStoreNameFromUrl(url))
  /* update storeSelected, storeName, storeId */
  var storeName = getStoreNameFromUrl(url)
  var storeId = getStoreIdFromUrl(url)
  dispatch(checkURL(true, storeName, storeId))
  searchImage(getStoreNameFromUrl(url), storeURL => {
    /* update storeURL */
    dispatch(updateImage(storeURL))
    readCredibility(ethAddress, rawCredibility => {
      /* update credibility */
      dispatch(updateCredibility(rawCredibility/200))
      storeExist(storeId, storeExist => {
        if (storeExist){
          /* update storeExist */
          dispatch(updateStoreExist(true))
          readOverallScore(storeId, (storeOverallScore, reviewAmount) => {
            /* update storeOverallScore */
            dispatch(updateOverallScore(storeOverallScore))
            /* update reviewAmount */
            dispatch(updateReviewAmount(reviewAmount))
            dispatch(initializeEnd())
            dispatch(readAllReviewsAction(storeId, reviewAmount, ethAddress))
          })
        } else {
          /* update storeExist */
          dispatch(updateStoreExist(false))
          /* update storeOverallScore */
          dispatch(updateOverallScore(0))
          /* update reviewAmount */
          dispatch(updateReviewAmount(0))
          dispatch(updateStoreExist(false))
          dispatch(initializeEnd())
        }
      })
    })
  })
}

export const newStoreCreatedAction = (storeId, ethAddress) => dispatch => {
  dispatch(updateStoreExist(true))
  dispatch(updateEthBalance(ethAddress))
  readOverallScore(storeId, (storeOverallScore, reviewAmount) => {
    /* update storeOverallScore */
    dispatch(updateOverallScore(storeOverallScore))
    /* update reviewAmount */
    dispatch(updateReviewAmount(reviewAmount))
    dispatch(processEnd())
  })
}

export const createStoreAction = (storeId, record) => dispatch => {
  dispatch(processStart())
  createStore(storeId, (error, transactionHash) => {
    if (error){
      console.log(error)
      dispatch(alertMessage("Create store failed!"))
      dispatch(processEnd())
    } else {
      /* write history */
      record.txHash = transactionHash
      writeHistory(record, (flag) => {
        if (flag){
          console.log("history logged")
        }
      })
      var refreshCheck = setInterval( () => {
				storeExist(storeId, (is_exist) => {
  				if (is_exist){
            dispatch(alertMessage("Create store success!"))
  					clearInterval(refreshCheck)
            dispatch(newStoreCreatedAction(storeId, record.originalReviewer))
  				}
  			})
			}, 3000)
    }
  })
}

export const writeReviewAction = (storeId, commment, score, record) => dispatch => {
  dispatch(processStart())
  writeReview(storeId, commment, score, (error, transactionHash) => {
    if (error){
      console.log(error)
      dispatch(alertMessage("Write review failed!"))
      dispatch(processEnd())
    } else {
      dispatch(addNewReviewAction(commment, score, record.originalReviewer))
      /* write history */
      record.txHash = transactionHash
      writeHistory(record, (flag) => {
        if (flag){
          console.log("history logged")
        }
      })
      dispatch(processEnd())
    }
  })
}

export const readAllReviewsAction = (storeId, totalReviewAmount, ethAddress) => dispatch => {
  if (totalReviewAmount == 0){
    dispatch(readReviewEnd())
  } else {
    dispatch(readReviewStart())
    dispatch(updateMyReviewIndex(-1))
    let reviews = []
    let counter = totalReviewAmount
    for (let i=0; i<totalReviewAmount; i++){
      readReview(storeId, i, (review) => {
        if (ethAddress == review.reviewerAddress){
          dispatch(updateMyReviewIndex(i))
        }
        review.time = timeConverter(parseInt(review.timestamp) * 1000)
        review.score = parseInt(review.score)/20
        readVoted(storeId, ethAddress, review.reviewerAddress, (voted) => {
          review.voted = voted
          addressToUsername(review.reviewerAddress, (reviewer) => {
            review.reviewer = reviewer
            reviews.push(review)
            counter--
            if (counter==0){
              dispatch(updateAllReviews(reviews))
              dispatch(readReviewEnd())
            }
          })
        })
      })
    }
  }
}

export const addNewReviewAction = (content, score, reviewer) => dispatch => {
  let review = {
    reviewer,
    content,
    score,
    upvote: 0,
    downvote: 0,
    time: 'pending...',
    voted: false
  }
  dispatch(updateOverallScore(score))
  addressToUsername(reviewer, (reviewer) => {
    review.reviewer = reviewer
    dispatch(reviewAmountPlusOne())
    dispatch(addNewReview(review))
  })
}

export const voteReviewAction = (storeId, reviewer, isUpvote, record) => dispatch => {
  voteReview(storeId, reviewer, isUpvote, (error, transactionHash) => {
    if (error){
      console.log(error)
      dispatch(alertMessage("Vote review failed!"))
    } else {
      /* write history */
      record.txHash = transactionHash
      writeHistory(record, (flag) => {
        if (flag){
          console.log("history logged")
        }
      })
    }
  })
}
