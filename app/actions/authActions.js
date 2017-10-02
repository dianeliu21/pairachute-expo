import * as types from './actionTypes'
import { NavigationActions } from 'react-navigation'
import fb from '../config/initializeFirebase'
var db = fb.database()

export function login (email, password) {
  return async function (dispatch) {
    try {
      dispatch(loginAttempt())
      let response = await fb.auth().signInWithEmailAndPassword(email, password)
      let userInfo = ( await db.ref('/users/' + response.uid).once('value') ).val()
      var user = {
        displayName: response.displayName,
        email: response.email,
        emailVerified: response.emailVerified,
        firstName: userInfo.first_name,
        providerData: response.providerData,
        refreshToken: response.refreshToken,
        reflectionType: userInfo.reflectionType,
        showWelcome: userInfo.showWelcome,
        threads: userInfo.threads,
        uid: response.uid
      }
      dispatch(loginSuccess(user))
      if (userInfo.reflectionType === 'paired') {
        dispatch(NavigationActions.navigate({routeName: 'PairedHome'}))
      } else {
        dispatch(NavigationActions.navigate({routeName: 'SoloHome'}))
      }
      // dispatch(NavigationActions.navigate({routeName: 'Home'}))
    } catch (error) {
      console.log(error.message)
      dispatch(loginFailure(error.message))
    }
  }
}

export function signup (firstName, lastName, email, phoneNumber, password) {
  return async function (dispatch) {
    try {
      dispatch(signupAttempt())
      let response = await fb.auth().createUserWithEmailAndPassword(email, password)
      await response.updateProfile({displayName: firstName + ' ' + lastName})

      var user = {
        displayName: response.displayName,
        email: response.email,
        emailVerified: response.emailVerified,
        providerData: response.providerData,
        refreshToken: response.refreshToken,
        uid: response.uid
      }

      await db.ref('/users/' + response.uid).set({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber
      })
      dispatch(signupSuccess(user))
      // dispatch(NavigationActions.reset({
      //   index: 0,
      //   actions: [
      //     NavigationActions.navigate({routeName: 'Home'})
      //   ]
      // }))
      dispatch(NavigationActions.navigate({routeName: 'Home'}))
    } catch (error) {
      console.log(error.message)
      dispatch(signupFailure(error.message))
    }
  }
}

export function switchLoginToSignup () {
  return function (dispatch) {
    dispatch(NavigationActions.navigate({routeName: 'Signup'}))
    dispatch(switchLoginSignup())
  }
}

function switchLoginSignup () {
  return {
    type: types.SWITCH_LOGIN_SIGNUP
  }
}

export function switchSignupToLogin () {
  return {
    type: types.SWITCH_LOGIN_SIGNUP
  }
}

function loginAttempt () {
  return {
    type: types.LOGIN_ATTEMPT
  }
}

function loginSuccess (user) {
  return {
    type: types.LOGIN_SUCCESS,
    user
  }
}

function loginFailure (errorMessage) {
  return {
    type: types.LOGIN_FAILURE,
    errorMessage
  }
}

function signupAttempt () {
  return {
    type: types.SIGNUP_ATTEMPT
  }
}

function signupSuccess (user) {
  return {
    type: types.SIGNUP_SUCCESS,
    user
  }
}

function signupFailure (errorMessage) {
  return {
    type: types.SIGNUP_FAILURE,
    errorMessage
  }
}
