import { URL } from '../constants'

export const REQUEST_LOGIN_STATUS = 'REQUEST_LOGIN_STATUS'
export const RESPONSE_LOGIN_STATUS = 'RESPONSE_LOGIN_STATUS'

export const requestLoginStatusAction = () => ({
	type: REQUEST_LOGIN_STATUS,
})

export const responseLoginStatusAction = (status, profile) =>({
	type: RESPONSE_LOGIN_STATUS,
	status,
	profile
})

export const checkLoginStatus = () => dispatch => {
	dispatch(requestLoginStatusAction())
	return fetch(`${URL}/user/`, {
		method: 'GET',
	})
	.then(response => response.json())
	.then(json => {
		dispatch(responseLoginStatusAction(json.status, json.profile))
	})
}