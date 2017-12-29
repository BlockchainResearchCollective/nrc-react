import {
  PROCESS_START, PROCESS_END, INITIALIZE_START, INITIALIZE_END,
  CHECK_URL, UPDATE_IMAGE, UPDATE_CREDIBILITY,
  UPDATE_STORE_EXIST, UPDATE_OVERALL_SCORE, UPDATE_REVIEW_AMOUNT
} from './ActionTypes'
import { checkUrlStatus, getStoreNameFromUrl, getStoreIdFromUrl, searchImage } from '../service/util'
import {
  storeExist, readOverallScore, readCredibility, createStore
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
  if (checkUrlStatus(url)){
    console.log(url)
    console.log(getStoreIdFromUrl(url))
    console.log(getStoreNameFromUrl(url))
    /* update storeSelected, storeName, storeURL */
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
            })
          } else {
            dispatch(initializeEnd())
          }
        })
      })
    })
  } else {
    /* update storeSelected, storeName, storeURL */
    dispatch(checkURL(true, "The Quad Cafe", "TheQuadCafe--1.344--103.679"))
    searchImage("The Quad Cafe", storeURL => {
      /* update storeURL */
      dispatch(updateImage(storeURL))
      readCredibility(ethAddress, rawCredibility => {
        /* update credibility */
        dispatch(updateCredibility(rawCredibility/200))
        storeExist("TheQuadCafe--1.344--103.679", storeExist => {
          if (storeExist){
            /* update storeExist */
            dispatch(updateStoreExist(storeExist))
            readOverallScore("TheQuadCafe--1.344--103.679", (storeOverallScore, reviewAmount) => {
              /* update storeOverallScore */
              dispatch(updateOverallScore(storeOverallScore))
              /* update reviewAmount */
              dispatch(updateReviewAmount(reviewAmount))
              dispatch(initializeEnd())
            })
          } else {
            dispatch(initializeEnd())
          }
        })
      })
    })
  }
}

export const newStoreCreatedAction = (storeId, callback) => dispatch => {
  dispatch(updateStoreExist(true))
  readOverallScore(storeId, (storeOverallScore, reviewAmount) => {
    /* update storeOverallScore */
    dispatch(updateOverallScore(storeOverallScore))
    /* update reviewAmount */
    dispatch(updateReviewAmount(reviewAmount))
    callback()
  })
}

export const createStoreAction = (storeId) => dispatch => {
  dispatch(processStart())
  createStore(storeId, (error, transactionHash) => {
    if (error){
      console.log(error)
      dispatch(alertMessage("Create store failed!"))
      dispatch(processEnd())
    } else {
      /* write history */
      var refreshCheck = setInterval( () => {
				storeExist(storeId, function(is_exist){
  				if (is_exist){
            dispatch(alertMessage("Create store success!"))
  					clearInterval(refreshCheck);
            dispatch(newStoreCreatedAction(
              storeId,
              () => {
                dispatch(processEnd())
              }
            ))
  				}
  			})
			}, 1000)
    }
  })
}
