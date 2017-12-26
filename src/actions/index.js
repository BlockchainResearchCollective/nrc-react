import { URL } from '../constants'
import { getBalance } from '../service/blockchain'

export const REQUEST_LOGIN_STATUS = 'REQUEST_LOGIN_STATUS'
export const RESPONSE_LOGIN_STATUS = 'RESPONSE_LOGIN_STATUS'
export const REQUEST_LOGIN ='REQUEST_LOGIN'
export const RESPONSE_LOGIN = 'RESPONSE_LOGIN'
export const REQUEST_USERNAME_VALIDATION ='REQUEST_USERNAME_VALIDATION'
export const RESPONSE_USERNAME_VALIDATION = 'RESPONSE_USERNAME_VALIDATION'
export const REQUEST_EMAIL_VALIDATION ='REQUEST_EMAIL_VALIDATION'
export const RESPONSE_EMAIL_VALIDATION = 'RESPONSE_EMAIL_VALIDATION'
export const REQUEST_SIGN_UP ='REQUEST_SIGN_UP'
export const RESPONSE_SIGN_UP = 'RESPONSE_SIGN_UP'
export const REQUEST_ETH_BALANCE = 'REQUEST_ETH_BALANCE'
export const RESPONSE_ETH_BALANCE = 'RESPONSE_ETH_BALANCE'

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

export const requestLoginAction = (username) => ({
	type: REQUEST_LOGIN,
	username
})

export const responseLoginAction = (status) => ({
	type: RESPONSE_LOGIN,
	status
})

export const requestSignUpAction = (username, email) => ({
	type: REQUEST_SIGN_UP,
	username,
	email
})

export const responseSignUpAction = (status) => ({
	type: RESPONSE_SIGN_UP,
	status
})

export const requestEthBalance = (ethAddress) => ({
	type: REQUEST_ETH_BALANCE,
	ethAddress
})

export const responseEthBalance = (ethAddress, ethBalance) => ({
	type: RESPONSE_ETH_BALANCE,
	ethAddress,
	ethBalance
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

export const signUp = (username, email, password, cb) => dispatch => {
	dispatch(requestSignUpAction(username, email))
	return fetch(`${URL}/user/signup`, {
		method: 'POST',
		headers: {
	    'Content-Type': 'application/json'
	  },
		body: JSON.stringify({
			username,
			email,
			password
		}),
		credentials: 'include'
	})
	.then(response => {
		dispatch(responseSignUpAction(response.status))
		if (response.status == 200){
			cb(true)
		}
		cb(false)
	})
}

export const updateEthBalance = (ethAddress) => dispatch => {
	dispatch(requestEthBalance(ethAddress))
	getBalance(ethAddress).then(balance =>{
		dispatch(responseEthBalance(ethAddress, balance/(10**18)))
	})
}
