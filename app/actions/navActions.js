import * as types from './actionTypes'
import { NavigationActions } from 'react-navigation'

export function navToHome () {
  return function (dispatch) {
    dispatch(NavigationActions.navigate({routeName: 'Home'}))
    dispatch({ type: types.NAV_TO_HOME })
  }
}
