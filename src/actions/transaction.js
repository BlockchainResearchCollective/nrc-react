import {
  PROCESS_START, PROCESS_END, INITIALIZE_START, INITIALIZE_END,
  CHECK_URL, UPDATE_IMAGE, UPDATE_CREDIBILITY,
  UPDATE_STORE_EXIST, UPDATE_OVERALL_SCORE, UPDATE_REVIEW_AMOUNT
} from './ActionTypes'
import { checkUrlStatus, getStoreNameFromUrl, getStoreIdFromUrl, searchImage } from '../service/util'
import {
  storeExist, readOverallScore, readCredibility, createStore, writeReview
} from '../service/blockchain'
import { writeHistory } from '../service/backend'
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

export const initialize = (url, ethAddress) => dispatch => {
  dispatch(initializeStart())
  var storeName;
  var storeId
  if (checkUrlStatus(url)){
    storeName = getStoreNameFromUrl(url)
    storeId = getStoreIdFromUrl(url)
  } else {
    storeName = 'Sushi Express @ Jurong Point 2'
    storeId = 'SushiExpress@JurongPoint2--1.339--103.705'
  }
  /* hardcode storeSelected, storeName, storeId */
  dispatch(checkURL(true, storeName, storeId))
  searchImage(storeName)
  .then(storeURL => {
    /* update storeURL */
    dispatch(updateImage(storeURL))
    return readCredibility(ethAddress)
  })
  .then(rawCredibility => {
    /* update credibility */
    dispatch(updateCredibility(rawCredibility/200))
    return storeExist(storeId)
  })
  .then(storeExist => {
    /* update storeExist */
    dispatch(updateStoreExist(storeExist))
    if (storeExist){
      return readOverallScore(storeId)
    } 
  })
  .then((storeOverallScore, reviewAmount) => {
    if (storeOverallScore!==undefined && reviewAmount!==undefined){
      /* update storeOverallScore */
      dispatch(updateOverallScore(storeOverallScore))
      /* update reviewAmount */
      dispatch(updateReviewAmount(reviewAmount))
    }
    return dispatch(initializeEnd())
  })
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
