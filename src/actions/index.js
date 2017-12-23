import { URL } from '../constants'

export const REQUEST_LOGIN_STATUS = 'REQUEST_LOGIN_STATUS'
export const RESPONSE_LOGIN_STATUS = 'RESPONSE_LOGIN_STATUS'
export const REQUEST_LOGIN ='REQUEST_LOGIN'
export const RESPONSE_LOGIN = 'RESPONSE_LOGIN'

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
		credentials: 'include'
	})
	.then(response => response.json())
	.then(json => {
		dispatch(responseLoginStatusAction(json.status, json.profile))
	})
}

export const requestLoginAction = (username) => ({
	type: REQUEST_LOGIN,
	username
})

export const responseLoginAction = (status) => ({
	type: RESPONSE_LOGIN,
	status
})

export const login = (username, password) => dispatch => {
	dispatch(requestLoginAction(username))
	return fetch(`${URL}/user/login`, {
		method: 'POST',
		headers: {
	    'Content-Type': 'application/json'
	  },
		body: JSON.stringify({
			username,
			password
		}),
		credentials: 'include'
	})
	.then(response => {
		dispatch(responseLoginAction(response.status))
		if (response.status == 200 ){
			dispatch(checkLoginStatus())
		}
	})
}
