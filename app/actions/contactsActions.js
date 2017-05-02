import * as types from './actionTypes'
import fb from '../config/initializeFirebase'

var db = fb.database()

export function loadContacts () {
  return async function (dispatch) {
    try {
      dispatch(loadContactsAttempt())

      let uid = fb.auth().currentUser.uid
      var userContactsRef = db.ref('/users/' + uid + '/contacts/')
      var contacts = []

      userContactsRef.on('value', async function (snapshot) {
        var contactsInfo = snapshot.val()
        if (contactsInfo != null) {
          for (var id in contactsInfo) {
            var contactRefString = '/users/' + id.toString()
            let userInfo = await db.ref(contactRefString).once('value')
            contacts.push({
              uid: id,
              first_name: userInfo.val().first_name,
              last_name: userInfo.val().last_name
            })
          }
        }
        dispatch(loadContactsSuccess(contacts))
      })
    } catch (error) {
      console.log(error)
      dispatch(loadContactsFailure())
    }
  }
}

export function loadContactCard (uid) {
  return async function (dispatch) {
    try {
      dispatch(loadContactCardAttempt())
      let contact = await db.ref('/users/' + uid).once('value')
      console.log('this is contact', contact.val())
      var focusedContact = {
        uid: uid,
        first_name: contact.val().first_name,
        last_name: contact.val().last_name,
        email: contact.val().email,
        phone_number: contact.val().phone_number
      }
      dispatch(loadContactCardSuccess(focusedContact))
    } catch (error) {
      console.log(error)
      dispatch(loadContactCardFailure())
    }
  }
}

function loadContactsAttempt () {
  return {
    type: types.LOAD_CONTACTS_ATTEMPT
  }
}

function loadContactsSuccess (contacts) {
  return {
    type: types.LOAD_CONTACTS_SUCCESS,
    contacts
  }
}

function loadContactsFailure () {
  return {
    type: types.LOAD_CONTACTS_FAILURE
  }
}

function loadContactCardAttempt () {
  return {
    type: types.LOAD_CONTACT_CARD_ATTEMPT
  }
}

function loadContactCardSuccess (focusedContact) {
  // Actions.contactCard({title: focusedContact.first_name + ' ' + focusedContact.last_name})
  return {
    type: types.LOAD_CONTACT_CARD_SUCCESS,
    focusedContact
  }
}

function loadContactCardFailure () {
  return {
    type: types.LOAD_CONTACT_CARD_FAILURE
  }
}
