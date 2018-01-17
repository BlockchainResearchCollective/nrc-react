import {
  PROCESS_START, PROCESS_END, INITIALIZE_START, INITIALIZE_END,
  CHECK_URL, UPDATE_IMAGE, UPDATE_CREDIBILITY,
  UPDATE_STORE_EXIST, UPDATE_OVERALL_SCORE, UPDATE_REVIEW_AMOUNT,
  UPDATE_ALL_REVIEWS, UPDATE_MY_REVIEW_INDEX,
  READ_REVIEWS_START, READ_REVIEWS_END, ADD_NEW_REVIEW
} from './ActionTypes'
import { getStoreNameFromUrl, getStoreIdFromUrl, searchImage, timeConverter, storeIdToStoreName } from '../service/util'
import {
  storeExist, readOverallScore, readCredibility, createStore, writeReview, readReview, voteReview, readVoted,
  checkVetting, settle, claim, readSettlement, calculateReward, reviewIndexPlusOneByReviewer
} from '../service/blockchain'
import { writeHistory, addressToUsername, writeOthersHistory } from '../service/backend'
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
  /* reset period */
  dispatch(updateMyReviewIndex(-1))
  dispatch(updateAllReviews([]))
  /* update Ether balance */
  dispatch(updateEthBalance(ethAddress))
  console.log("address: " + ethAddress)
  console.log(url)
  console.log(getStoreIdFromUrl(url))
  console.log(getStoreNameFromUrl(url))
  /* settle review */
  checkVetting(ethAddress, (result) => {
    if (result){
      console.log("There is no review to settle and claim")
    } else {
      console.log("There are reviews to settle and claim")
      /* calculate matured vetting reward */
      calculateReward(ethAddress, (reviewRecords, voteRecords) => {
        settle(ethAddress, (error, transactionHash) => {
          if (error){
            console.log(error)
          } else {
            console.log("Vetting transactions are settled!")
            /* log review history */
            reviewRecords.map((record) => {
              let history = {
                txHash: transactionHash,
                value: (parseFloat(record.value)/1000000000000000000).toFixed(3).toString(),
                isPositive: record.positive,
                storeName: storeIdToStoreName(record.storeId),
                action: "Settle Review",
                status: record.status
              }
              writeHistory(history, (flag) => {
                if (flag){
                  console.log("history logged")
                }
              })
            })
            /* log vote history */
            voteRecords.map((record) => {
              let history = {
                txHash: transactionHash,
                value: record.value,
                isPositive: record.positive,
                storeName: storeIdToStoreName(record.storeId),
                action: "Settle Vote",
                status: record.status
              }
              /* we should not add others' history, but just for demo purpose */
              writeOthersHistory(record.voter, history, (flag) => {
                if (flag){
                  console.log("history logged")
                }
              })
            })
          }
        })
      })
    }
  })
  /* claim deposit and reward */
  readSettlement(ethAddress, (result) => {
    if (parseFloat(result) > 0){
      claim(ethAddress, (error) => {
        if (error){
          console.log(error)
        } else {
          console.log("Deposits and rewards are claimed!")
          console.log("Amount: " + result)
        }
      })
    } else {
      console.log("Nothing to claim")
    }
  })
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
          dispatch(updateMyReviewIndex(-1))
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

export const writeReviewRefreshCheck = (storeId, reviewer, last_update) => dispatch => {
  console.log("last_update: " + last_update)
  let counter = 0
  var refreshCheck = setInterval( () => {
    reviewIndexPlusOneByReviewer(storeId, reviewer, (index) => {
      if (index!=0){
        if (last_update==0){
          dispatch(alertMessage("Write review success!"))
          clearInterval(refreshCheck)
          dispatch(processEnd())
          dispatch(initialize(window.location.href, reviewer))
        } else {
          readReview(storeId, index-1, (review) => {
            console.log("last_update: " + last_update)
            console.log("review: " + review)
            counter++
            if (review.timestamp != last_update){
              dispatch(alertMessage("Write review success!"))
              clearInterval(refreshCheck)
              dispatch(processEnd())
              dispatch(initialize(window.location.href, reviewer))
            }
          })
        }
      } else {
        counter++
      }
      if (counter==10){
        clearInterval(refreshCheck)
        dispatch(alertMessage("Write review failed!"))
        dispatch(processEnd())
      }
    })
  }, 3000)
}

export const writeReviewAction = (storeId, commment, score, record) => dispatch => {
  dispatch(processStart())
  let last_update = 0
  reviewIndexPlusOneByReviewer(storeId, record.originalReviewer, (index) => {
    if (index!=0){
      /* for old review */
      readReview(storeId, index-1, (review) => {
        last_update = review.timestamp
        if (new Date().getTime() > (parseInt(last_update) + 600) * 1000){
          /* for new vetting */
          writeReview(storeId, commment, score, 10000000000000000, (error, transactionHash) => {
            if (error){
              console.log(error)
              dispatch(alertMessage("Write review failed!"))
              dispatch(processEnd())
            } else {
              /* write history */
              record.txHash = transactionHash
              record.value = '0.011'
              record.action = "Write Review"
              record.status = "Processing Review"
              writeHistory(record, (flag) => {
                if (flag){
                  console.log("history logged")
                }
              })
              dispatch(writeReviewRefreshCheck(storeId, record.originalReviewer, last_update))
            }
          })
        } else {
          /* for existed vetting */
          writeReview(storeId, commment, score, 0, (error, transactionHash) => {
            if (error){
              console.log(error)
              dispatch(alertMessage("Write review failed!"))
              dispatch(processEnd())
            } else {
              /* write history */
              record.txHash = transactionHash
              record.value = '0.001'
              record.action = "Update Review"
              record.status = "Review Updated"
              writeHistory(record, (flag) => {
                if (flag){
                  console.log("history logged")
                }
              })
              dispatch(writeReviewRefreshCheck(storeId, record.originalReviewer, last_update))
            }
          })
        }
      })
    } else {
      /* for new review */
      writeReview(storeId, commment, score, 10000000000000000, (error, transactionHash) => {
        if (error){
          console.log(error)
          dispatch(alertMessage("Write review failed!"))
          dispatch(processEnd())
        } else {
          /* write history */
          record.txHash = transactionHash
          record.value = '0.011'
          record.action = "Write Review"
          record.status = "Processing Review"
          writeHistory(record, (flag) => {
            if (flag){
              console.log("history logged")
            }
          })
          dispatch(writeReviewRefreshCheck(storeId, record.originalReviewer, last_update))
        }
      })
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
        review.time = timeConverter(parseInt(review.timestamp) * 1000)
        review.score = parseInt(review.score)/20
        readVoted(storeId, ethAddress, review.reviewerAddress, (voted) => {
          review.voted = voted
          addressToUsername(review.reviewerAddress, (reviewer) => {
            review.reviewer = reviewer
            reviews.push(review)
            counter--
            if (counter==0){
              for (let i=0; i<totalReviewAmount; i++){
                if (ethAddress == reviews[i].reviewerAddress){
                  let temp = reviews[0]
                  reviews[i].reviewer = reviews[i].reviewer + "[me]"
                  reviews[0] = reviews[i]
                  reviews[i] = temp
                  dispatch(updateMyReviewIndex(0))
                }
              }
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
    score: score/20,
    upvote: 0,
    downvote: 0,
    time: 'pending...',
    voted: false
  }
  addressToUsername(reviewer, (reviewer) => {
    review.reviewer = reviewer
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
          dispatch(alertMessage("Vote review success!"))
          console.log("history logged")
        }
      })
    }
  })
}
