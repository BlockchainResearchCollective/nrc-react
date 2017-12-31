import {
  ALERT_MESSAGE, CLEAR_MESSAGE
} from './ActionTypes'
import { decryptPrivateKey, addPrivateKey } from '../service/blockchain'

/* System Action Creators */

export const alertMessage = (message) => ({
	type: ALERT_MESSAGE,
	message
})
export const clearMessage = () => ({
	type: CLEAR_MESSAGE
})

export const decryptKey = (ethAddress, encryptedAccount, hashedPassword) => {
  if (addPrivateKey(ethAddress, decryptPrivateKey(encryptedAccount, hashedPassword))){
    console.log("ethAddress: " + ethAddress)
    console.log("Account is decrypted!")
  } else {
    console.log("Account is not decrypted!")
  }
}
