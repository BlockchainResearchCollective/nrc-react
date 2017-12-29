import {
  PROCESS_START, PROCESS_END, CHECK_URL, UPDATE_IMAGE, UPDATE_CREDIBILITY,
  UPDATE_STORE_EXIST, UPDATE_OVERALL_SCORE, UPDATE_REVIEW_AMOUNT
} from './ActionTypes'
import { checkUrlStatus, getStoreNameFromUrl, getStoreIdFromUrl, searchImage } from '../service/util'
import { storeExist, readOverallScore, readCredibility } from '../service/blockchain'

/* Transaction Action Creators */

export const processStart = () => ({
	type: PROCESS_START
})
export const processEnd = () => ({
	type: PROCESS_END
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
  dispatch(processStart())
  if (checkUrlStatus(url)){
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
              dispatch(processEnd())
            })
          } else {
            dispatch(processEnd())
          }
        })
      })
    })
  } else {
    /* update storeSelected, storeName, storeURL */
    dispatch(checkURL(true, "Koufu @ the South Spine", "Koufu@theSouthSpine--1.342--103.682"))
    searchImage("Koufu @ the South Spine", storeURL => {
      /* update storeURL */
      dispatch(updateImage(storeURL))
      readCredibility(ethAddress, rawCredibility => {
        /* update credibility */
        dispatch(updateCredibility(rawCredibility/200))
        storeExist("Koufu@theSouthSpine--1.342--103.682", storeExist => {
          if (storeExist){
            /* update storeExist */
            dispatch(updateStoreExist(storeExist))
            readOverallScore("Koufu@theSouthSpine--1.342--103.682", (storeOverallScore, reviewAmount) => {
              /* update storeOverallScore */
              dispatch(updateOverallScore(storeOverallScore))
              /* update reviewAmount */
              dispatch(updateReviewAmount(reviewAmount))
              dispatch(processEnd())
            })
          } else {
            dispatch(processEnd())
          }
        })
      })
    })
  }
}
