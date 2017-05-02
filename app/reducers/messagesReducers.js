import * as types from '../actions/actionTypes'

export function threads (state = {}, action) {
  switch (action.type) {
    case types.LOAD_THREAD_LIST_SUCCESS:
      return Object.assign({}, state, {
        threads: action.threads
      })
    default:
      return state
  }
}

export function focusedThread (state = {}, action) {
  switch (action.type) {
    case types.INITIAL_LOAD_MESSAGES_SUCCESS:
      return Object.assign({}, state, {
        id: action.focusedThread.id,
        title: action.focusedThread.title,
        users: action.focusedThread.users,
        messages: action.focusedThread.messages
      })
    case types.LOAD_NEW_MESSAGES_SUCCESS:
      var newState = Object.assign({}, state)
      newState.messages = {...state.messages, ...action.newMessages}
      return newState
    default:
      return state
  }
}
