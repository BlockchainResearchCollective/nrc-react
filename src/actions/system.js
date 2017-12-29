import {
  ALERT_MESSAGE, CLEAR_MESSAGE
} from './ActionTypes'

/* System Action Creators */

export const alertMessage = (message) => ({
	type: ALERT_MESSAGE,
	message
})
export const clearMessage = () => ({
	type: CLEAR_MESSAGE
})
