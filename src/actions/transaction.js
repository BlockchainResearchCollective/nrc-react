import {
  PROCESS_START, PROCESS_END, INITIALIZE_START, INITIALIZE_END,
  CHECK_URL, UPDATE_IMAGE, UPDATE_CREDIBILITY,
  UPDATE_STORE_EXIST, UPDATE_OVERALL_SCORE, UPDATE_REVIEW_AMOUNT,
  UPDATE_ALL_REVIEWS, UPDATE_MY_REVIEW_INDEX,
  READ_REVIEWS_START, READ_REVIEWS_END
} from './ActionTypes'
import { checkUrlStatus, getStoreNameFromUrl, getStoreIdFromUrl, searchImage, timeConverter } from '../service/util'
import {
  storeExist, readOverallScore, readCredibility, createStore, writeReview, readReview
} from '../service/blockchain'
import { writeHistory, addressToUsername } from '../service/backend'
import { alertMessage } from './system'

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

export const initialize = (url, ethAddress) => dispatch => {
  dispatch(initializeStart())
  console.log("address: " + ethAddress)
  if (checkUrlStatus(url)){
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
            dispatch(updateStoreExist(storeExist))
            readOverallScore(storeId, (storeOverallScore, reviewAmount) => {
              /* update storeOverallScore */
              dispatch(updateOverallScore(storeOverallScore))
              /* update reviewAmount */
              dispatch(updateReviewAmount(reviewAmount))
              dispatch(initializeEnd())
              dispatch(readAllReviewsAction(storeId, reviewAmount, ethAddress))
            })
          } else {
            dispatch(updateStoreExist(false))
            dispatch(initializeEnd())
          }
        })
      })
    })
  } else {
    /* update storeSelected, storeName, storeId */
    dispatch(checkURL(true, "Sushi Express @ Jurong Point 2", "SushiExpress@JurongPoint2--1.339--103.705"))
    searchImage("Sushi Express @ Jurong Point 2", storeURL => {
      /* update storeURL */
      dispatch(updateImage(storeURL))
      readCredibility(ethAddress, rawCredibility => {
        /* update credibility */
        dispatch(updateCredibility(rawCredibility/200))
        storeExist("SushiExpress@JurongPoint2--1.339--103.705", storeExist => {
          if (storeExist){
            /* update storeExist */
            dispatch(updateStoreExist(storeExist))
            readOverallScore("SushiExpress@JurongPoint2--1.339--103.705", (storeOverallScore, reviewAmount) => {
              /* update storeOverallScore */
              dispatch(updateOverallScore(storeOverallScore))
              /* update reviewAmount */
              dispatch(updateReviewAmount(reviewAmount))
              dispatch(initializeEnd())
              dispatch(readAllReviewsAction("SushiExpress@JurongPoint2--1.339--103.705", reviewAmount, ethAddress))
            })
          } else {
            dispatch(initializeEnd())
          }
        })
      })
    })
  }
}

export const newStoreCreatedAction = (storeId) => dispatch => {
  dispatch(updateStoreExist(true))
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
				storeExist(storeId, function(is_exist){
  				if (is_exist){
            dispatch(alertMessage("Create store success!"))
  					clearInterval(refreshCheck);
            dispatch(newStoreCreatedAction(storeId))
  				}
  			})
			}, 1000)
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
  dispatch(readReviewStart())
  let reviews = []
  let counter = totalReviewAmount
  for (let i=0; i<totalReviewAmount; i++){
    readReview(storeId, i, (review) => {
      if (ethAddress == review.reviewerAddress){
        dispatch(updateMyReviewIndex(i))
      }
      review.time = timeConverter(parseInt(review.timestamp) * 1000)
      review.score = parseInt(review.score)/20
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
  }
}

export const addNewReview = (content, score) => dispatch => {

}
