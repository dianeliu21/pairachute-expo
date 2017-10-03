import { combineReducers } from 'redux'

import * as authReducers from './authReducers'
import * as messagesReducers from './messagesReducers'
import * as navReducers from './navReducers'

const AppReducer = combineReducers({
  authState: authReducers.authState,
  focusedThread: messagesReducers.focusedThread,
  nav: navReducers.nav,
  threads: messagesReducers.threads,
  user: authReducers.user
})

export default AppReducer
