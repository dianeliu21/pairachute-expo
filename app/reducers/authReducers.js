import * as types from '../actions/actionTypes'

const initialAuthState = { isAuthenticated: false }

export function authState (state = initialAuthState, action) {
  switch (action.type) {
    case types.LOGIN_ATTEMPT:
    case types.SIGNUP_ATTEMPT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isPending: true
      })
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
    case 'Login':
      return Object.assign({}, state, {
        isAuthenticated: true,
        isPending: false
      })
    case types.LOGIN_FAILURE:
    case types.SIGNUP_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.errorMessage,
        isAuthenticated: false,
        isPending: false
      })
    case types.SWITCH_LOGIN_SIGNUP:
      return Object.assign({}, state, {
        errorMessage: '',
        isAuthenticated: false,
        isPending: false
      })
    case types.CHANGE_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        changePasswordSuccessMessage: action.successMessage
      })
    case types.CHANGE_PASSWORD_FAILURE:
    return Object.assign({}, state, {
      changePasswordFailureMessage: action.errorMessage
    })
    case 'Logout':
      return { ...state, isLoggedIn: false }
    default:
      return state
  }
}

export function user (state = {}, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        displayName: action.user.displayName,
        email: action.user.email,
        emailVerified: action.user.emailVerified,
        providerData: action.user.providerData,
        refreshToken: action.user.refreshToken,
        reflectionType: action.user.reflectionType,
        showWelcome: action.user.showWelcome,
        threads: action.user.threads,
        uid: action.user.uid
      })
    default:
      return state
  }
}
