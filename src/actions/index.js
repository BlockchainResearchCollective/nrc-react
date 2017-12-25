import { URL } from '../constants'

export const REQUEST_LOGIN_STATUS = 'REQUEST_LOGIN_STATUS'
export const RESPONSE_LOGIN_STATUS = 'RESPONSE_LOGIN_STATUS'
export const REQUEST_LOGIN ='REQUEST_LOGIN'
export const RESPONSE_LOGIN = 'RESPONSE_LOGIN'
export const REQUEST_USERNAME_VALIDATION ='REQUEST_USERNAME_VALIDATION'
export const RESPONSE_USERNAME_VALIDATION = 'RESPONSE_USERNAME_VALIDATION'
export const REQUEST_EMAIL_VALIDATION ='REQUEST_EMAIL_VALIDATION'
export const RESPONSE_EMAIL_VALIDATION = 'RESPONSE_EMAIL_VALIDATION'

export const requestLoginStatusAction = () => ({
	type: REQUEST_LOGIN_STATUS,
})

export const responseLoginStatusAction = (status, profile) =>({
	type: RESPONSE_LOGIN_STATUS,
	status,
	profile
})

export const requestUsernameValidationAction = (username) => ({
	type: REQUEST_USERNAME_VALIDATION,
	username
})

export const responseUsernameValidationAction = (usernameStatus) => ({
	type: RESPONSE_USERNAME_VALIDATION,
	usernameStatus
})

export const requestEmailValidationAction = (email) => ({
	type: REQUEST_EMAIL_VALIDATION,
	email
})

export const responseEmailValidationAction = (emailStatus) => ({
	type: RESPONSE_EMAIL_VALIDATION,
	emailStatus
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

export const validateUsername = (username, cb) => dispatch => {
	dispatch(requestUsernameValidationAction)
	
	fetch(`${URL}/user/signup/validation`,{
		method: 'POST',
		headers: {
	    'Content-Type': 'application/json'
	  },
		body: JSON.stringify({
			username,
			email: 'default'
		}),
		credentials: 'include'
	})
	.then(response => response.json())
	.then(json => {
		dispatch(responseUsernameValidationAction(json.username_status))
		cb(json.username_status)
	})
}

export const validateEmail = (email, cb) => dispatch => {
	dispatch(requestEmailValidationAction(email))
	
	fetch(`${URL}/user/signup/validation`,{
		method: 'POST',
		headers: {
	    'Content-Type': 'application/json'
	  },
		body: JSON.stringify({
			username: 'default',
			email
		}),
		credentials: 'include'
	})
	.then(response => response.json())
	.then(json => {
		dispatch(responseEmailValidationAction(json.email_status))
		cb(json.email_status)
	})
}