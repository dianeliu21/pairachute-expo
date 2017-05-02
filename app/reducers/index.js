import { combineReducers } from 'redux'

import * as authReducers from './authReducers'
import * as contactsReducers from './contactsReducers'
import * as messagesReducers from './messagesReducers'
import * as navReducers from './navReducers'

const AppReducer = combineReducers({
  authState: authReducers.authState,
  contacts: contactsReducers.contacts,
  focusedContact: contactsReducers.focusedContact,
  focusedThread: messagesReducers.focusedThread,
  nav: navReducers.nav,
  threads: messagesReducers.threads,
  user: authReducers.user
})

export default AppReducer
