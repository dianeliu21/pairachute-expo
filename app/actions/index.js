import * as AuthActions from './authActions'
import * as MessagesActions from './messagesActions'
import * as NavActions from './navActions'

export const ActionCreators = Object.assign({},
  AuthActions,
  MessagesActions,
  NavActions
)
