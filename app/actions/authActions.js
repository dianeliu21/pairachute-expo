import * as types from './actionTypes'
import { NavigationActions } from 'react-navigation'
import fb from '../config/initializeFirebase'
import { Permissions, Notifications } from 'expo';
var db = fb.database()

var reactNative = require('react-native');
var {
  AsyncStorage
} = reactNative;

export function login (email, password) {
  return async function (dispatch) {
    try {
      dispatch(loginAttempt())
      AsyncStorage.multiSet([
        ['email', email],
        ['password', password]
      ]);
      let response = await fb.auth().signInWithEmailAndPassword(email, password)
      let userInfo = ( await db.ref('/users/' + response.uid).once('value') ).val()
      var user = {
        displayName: response.displayName || userInfo.displayName,
        email: response.email || userInfo.email,
        emailVerified: response.emailVerified,
        firstName: userInfo.firstName,
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
    } catch (error) {
      console.log(error.message)
      dispatch(loginFailure(error.message))
    }
  }
}

export function registerForPushNotificationsAsync() {
  return async function (dispatch) {
    try {
      dispatch({type: types.REGISTER_PUSH_ATTEMPT})

      const { existingStatus } = await Permissions.getAsync(Permissions.REMOTE_NOTIFICATIONS);
      let finalStatus = existingStatus;

      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
        finalStatus = status;
      }

      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        console.log('push failure - user did not grant permissions')
        dispatch({type: types.REGISTER_PUSH_FAILURE})
      }

      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();
      console.log('got token', token)

      var updates = {}
      var user = fb.auth().currentUser;
      let userInfo = (await db.ref('/users/' + user.uid).once('value')).val()
      var newUserInfo = Object.assign({}, userInfo, {
        pushToken: token
      })
      updates['/users/' + user.uid] = newUserInfo
      await db.ref().update(updates)
      dispatch({type: types.REGISTER_PUSH_SUCCESS})
    } catch (err) {
      console.log('push failure', err.message)
      dispatch({type: types.REGISTER_PUSH_FAILURE})
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
        avatarIndex: -1,
        providerData: response.providerData,
        refreshToken: response.refreshToken,
        uid: response.uid
      }

      await db.ref('/users/' + response.uid).set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone_number: phoneNumber,
        avatarIndex: -1,
      })
      dispatch(signupSuccess(user))
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

export function navToChangeAvatar () {
  return function (dispatch) {
    dispatch(NavigationActions.navigate({routeName: 'ChangeAvatar'}))
  }
}

export function changeAvatar (avatarIndex) {
  return async function (dispatch) {
    try {
      dispatch({type: types.CHANGE_AVATAR_ATTEMPT})

      var updates = {}
      var user = fb.auth().currentUser;
      let userInfo = (await db.ref('/users/' + user.uid).once('value')).val()
      var newUserInfo = Object.assign({}, userInfo, {
        avatarIndex: avatarIndex
      })
      updates['/users/' + user.uid] = newUserInfo
      await db.ref().update(updates)

      var successMessage = 'Avatar change successful!'
      dispatch({type: types.CHANGE_AVATAR_PASSWORD_SUCCESS, successMessage})
    } catch (error) {
      var errorMessage = error.message
      console.log('change avatar failure', errorMessage)
      dispatch({type: types.CHANGE_AVATAR_FAILURE, errorMessage})
    }
  }
}

export function navToChangePassword () {
  return function (dispatch) {
    dispatch(NavigationActions.navigate({routeName: 'ChangePassword'}))
  }
}

export function changePassword (password) {
  return async function (dispatch) {
    try {
      dispatch({type: types.CHANGE_PASSWORD_ATTEMPT})

      var user = fb.auth().currentUser;
      await user.updatePassword(password)

      var successMessage = 'Password change successful!'
      dispatch({type: types.CHANGE_PASSWORD_SUCCESS, successMessage})
    } catch (error) {
      var errorMessage = error.message
      console.log('change password failure', errorMessage)
      dispatch({type: types.CHANGE_PASSWORD_FAILURE, errorMessage})
    }
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
