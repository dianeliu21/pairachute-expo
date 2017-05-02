import * as AuthActions from './authActions'
import * as ContactsActions from './contactsActions'
import * as MessagesActions from './messagesActions'

export const ActionCreators = Object.assign({},
  AuthActions,
  ContactsActions,
  MessagesActions
)
