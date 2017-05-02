import * as types from './actionTypes'
import { NavigationActions } from 'react-navigation'
import fb from '../config/initializeFirebase'

var db = fb.database()

export function initialLoadMessages (threadInfo) {
  return async function (dispatch) {
    try {
      dispatch({type: types.INITIAL_LOAD_MESSAGES_ATTEMPT})
      var last20MsgRef = db.ref('/messages/' + threadInfo.id).limitToLast(20)
      // var last20MsgRef = db.ref('/messages/' + threadInfo.id)
      let last20Msg = await last20MsgRef.once('value')
      var focusedThread = Object.assign({}, threadInfo)
      focusedThread.messages = last20Msg.val()
      dispatch({type: types.INITIAL_LOAD_MESSAGES_SUCCESS, focusedThread})
      dispatch(NavigationActions.navigate({routeName: 'Message', params: {title: focusedThread.title}}))
    } catch (err) {
      console.log(err)
      dispatch({type: types.INITIAL_LOAD_MESSAGES_FAILURE})
    }
  }
}

export function loadNewMessages (threadInfo) {
  return function (dispatch) {
    try {
      dispatch({type: types.LOAD_NEW_MESSAGES_ATTEMPT})
      var threadRef = db.ref('/messages/' + threadInfo.id).limitToLast(1)
      threadRef.on('child_added', function (data) {
        var newMessages = {}
        newMessages[data.key] = data.val()
        dispatch({type: types.LOAD_NEW_MESSAGES_SUCCESS, newMessages})
      })
    } catch (err) {
      console.log(err)
      dispatch({type: types.LOAD_NEW_MESSAGES_FAILURE})
    }
  }
}

export function loadThreadList () {
  return async function (dispatch) {
    try {
      dispatch(loadThreadListAttempt())

      let uid = fb.auth().currentUser.uid
      var userThreadsRef = db.ref('/users/' + uid + '/threads')
      var threads = []

      userThreadsRef.on('value', async function (snapshot) {
        var userThreads = snapshot.val()
        for (var id in userThreads) {
          var threadRefString = '/threads/' + id.toString()
          let info = await db.ref(threadRefString).once('value')
          if (info.val().title) {
            var title = info.val().title
          } else {
            var names = []
            var users = {}
            var userids = Object.keys(info.val().users)
            for (var i in userids) {
              let name = await db.ref('/users/' + userids[i] + '/name').once('value')
              users[userids[i]] = name.val()
              if (userids[i] !== uid) names.push(name.val())
            }
            title = names.join(', ')
          }
          threads.push({
            id: id,
            users: users,
            last_message: info.val().last_message,
            title: title
          })
        }
        dispatch(loadThreadListSuccess(threads))
      })
    } catch (err) {
      console.log(err)
      dispatch(loadThreadListFailure())
    }
  }
}

export function sendMessage (message, senderId, threadId) {
  return async function (dispatch) {
    try {
      dispatch(sendMessageAttempt())
      var msgData = {
        message: message,
        sender_id: senderId,
        timestamp: Date.now()
      }

      var newMsgKey = db.ref('/messages').push().key
      var updates = {}
      updates['/messages/' + threadId + '/' + newMsgKey] = msgData
      updates['/threads/' + threadId + '/last_message'] = msgData

      await db.ref().update(updates)
      dispatch(sendMessageSuccess())
    } catch (err) {
      console.log(err)
      dispatch(sendMessageFailure())
    }
  }
}

// function loadMessagesAttempt () {
//   return {
//     type: types.LOAD_MESSAGES_ATTEMPT
//   }
// }
//
// function loadMessagesSuccess (threadInfo) {
//   return {
//     type: types.LOAD_MESSAGES_SUCCESS,
//     threadInfo
//   }
// }
//
// function loadMessagesFailure () {
//   return {
//     type: types.LOAD_MESSAGES_FAILURE
//   }
// }

function loadThreadListAttempt () {
  return {
    type: types.LOAD_THREAD_LIST_ATTEMPT
  }
}

function loadThreadListSuccess (threads) {
  return {
    type: types.LOAD_THREAD_LIST_SUCCESS,
    threads
  }
}

function loadThreadListFailure () {
  return {
    type: types.LOAD_THREAD_LIST_FAILURE
  }
}

function sendMessageAttempt () {
  return {
    type: types.SEND_MESSAGE_ATTEMPT
  }
}

function sendMessageSuccess () {
  return {
    type: types.SEND_MESSAGE_SUCCESS
  }
}

function sendMessageFailure () {
  return {
    type: types.SEND_MESSAGE_FAILURE
  }
}
