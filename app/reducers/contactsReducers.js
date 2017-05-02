import * as types from '../actions/actionTypes'

export function contacts (state = {}, action) {
  switch (action.type) {
    case types.LOAD_CONTACTS_SUCCESS:
      return Object.assign({}, state, {
        contacts: action.contacts
      })
    default:
      return state
  }
}

export function focusedContact (state = {}, action) {
  switch (action.type) {
    case types.LOAD_CONTACT_CARD_SUCCESS:
      return Object.assign({}, state, {
        uid: action.focusedContact.uid,
        first_name: action.focusedContact.first_name,
        last_name: action.focusedContact.last_name,
        email: action.focusedContact.email,
        phone_number: action.focusedContact.phone_number
      })
    default:
      return state
  }
}
