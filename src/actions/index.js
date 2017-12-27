import { URL } from '../constants'
import { getBalance } from '../service/blockchain'

export const REQUEST_LOGIN_STATUS = 'REQUEST_LOGIN_STATUS'
export const RESPONSE_LOGIN_STATUS = 'RESPONSE_LOGIN_STATUS'
export const REQUEST_LOGIN ='REQUEST_LOGIN'
export const RESPONSE_LOGIN = 'RESPONSE_LOGIN'
export const REQUEST_LOGOUT ='REQUEST_LOGOUT'
export const RESPONSE_LOGOUT = 'RESPONSE_LOGOUT'
export const REQUEST_USERNAME_VALIDATION ='REQUEST_USERNAME_VALIDATION'
export const RESPONSE_USERNAME_VALIDATION = 'RESPONSE_USERNAME_VALIDATION'
export const REQUEST_EMAIL_VALIDATION ='REQUEST_EMAIL_VALIDATION'
export const RESPONSE_EMAIL_VALIDATION = 'RESPONSE_EMAIL_VALIDATION'
export const REQUEST_SIGN_UP ='REQUEST_SIGN_UP'
export const RESPONSE_SIGN_UP = 'RESPONSE_SIGN_UP'
export const REQUEST_ETH_BALANCE = 'REQUEST_ETH_BALANCE'
export const RESPONSE_ETH_BALANCE = 'RESPONSE_ETH_BALANCE'
export const REQUEST_RESET_PASSWORD = 'REQUEST_RESET_PASSWORD'
export const RESPONSE_RESET_PASSWORD = 'RESPONSE_RESET_PASSWORD'
export const REQUEST_RESET_VERIFY = 'REQUEST_RESET_VERIFY'
export const RESPONSE_RESET_VERIFY = 'RESPONSE_RESET_VERIFY'
export const REQUEST_PASSWORD_CHANGE = 'REQUEST_PASSWORD_CHANGE'
export const RESPONSE_PASSWORD_CHANGE = 'RESPONSE_PASSWORD_CHANGE'

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

export const requestLogoutAction = () => ({
	type: REQUEST_LOGOUT,
})

export const responseLogoutAction = (status) => ({
	type: RESPONSE_LOGOUT,
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

export const requestResetPasswordAction = (email) => ({
	type: REQUEST_RESET_PASSWORD,
	email
})

export const responseResetPasswordAction = (email, status) => ({
	type: RESPONSE_RESET_PASSWORD,
	email,
	status
})

export const requestResetVerifyAction = (email, code) => ({
	type: REQUEST_RESET_VERIFY,
	email,
	code
})

export const responseResetVerifyAction = (email, status) => ({
	type: RESPONSE_RESET_VERIFY,
	email,
	status
})

export const requestPasswordChangeAction = (email) => ({
	type: REQUEST_PASSWORD_CHANGE,
	email
})

export const responsePasswordChangeAction = (email, status) => ({
	type: RESPONSE_PASSWORD_CHANGE,
	email,
	status
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

export const logout = () => dispatch => {
	dispatch(requestLogoutAction())
	return fetch(`${URL}/user/logout`, {
		method: 'GET',
		credentials: 'include'
	})
	.then(response => {
		dispatch(responseLogoutAction(response.status))
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

export const resetPassword = (email) => dispatch => {
	dispatch(requestResetPasswordAction(email))
	fetch(`${URL}/user/password-reset`, {
		method: 'POST',
		headers: {
	    'Content-Type': 'application/json'
	  },
		body: JSON.stringify({
			email
		}),
		credentials: 'include'
	})
	.then(response => dispatch(responseResetPasswordAction(email, response.status)))
}

export const verifyReset = (email, verificationCode) => dispatch => {
	dispatch(requestResetVerifyAction(email, verificationCode))
	fetch(`${URL}/user/password-reset/verify`, {
		method: 'POST',
		headers: {
	    'Content-Type': 'application/json'
	  },
		body: JSON.stringify({
			email,
			verificationCode
		}),
		credentials: 'include'
	})
	.then(response => dispatch(responseResetVerifyAction(email, response.status)))
}

export const changePassword = (email, newPassword) => dispatch =>{
	dispatch(requestPasswordChangeAction(email))
	fetch(`${URL}/user/password-change/`, {
		method: 'POST',
		headers: {
	    'Content-Type': 'application/json'
	  },
		body: JSON.stringify({
			email,
			newPassword
		}),
		credentials: 'include'
	})
	.then(response => dispatch(responsePasswordChangeAction(email, response.status)))
}