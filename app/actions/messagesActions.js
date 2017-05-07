import * as types from './actionTypes'
import { NavigationActions } from 'react-navigation'
import fb from '../config/initializeFirebase'

var db = fb.database()

export function loadMessages (threadInfo) {
  return async function (dispatch) {
    try {
      // load existing messages
      dispatch({type: types.INITIAL_LOAD_MESSAGES_ATTEMPT})
      var msgRef = db.ref('/messages/' + threadInfo.id).limitToLast(20)
      let msgObject = await msgRef.once('value')
      var msgs = Object.keys(msgObject.val()).map(function (key) {
        return Object.assign({}, msgObject.val()[key], {key: key})
      })
      console.log('initially setting oldest key as ', msgs[0].key)
      var focusedThread = Object.assign({}, threadInfo, {
        oldestMsgKey: msgs.length > 0 ? msgs[0].key : null,
        messages: msgs.reverse()
      })
      dispatch({type: types.INITIAL_LOAD_MESSAGES_SUCCESS, focusedThread})
      dispatch(NavigationActions.navigate({routeName: 'Message', params: {title: focusedThread.title}}))

      // listen for new messages
      try {
        dispatch({type: types.LOAD_NEW_MESSAGES_ATTEMPT})
        var newMsgRef = db.ref('/messages/' + threadInfo.id).limitToLast(1)
        newMsgRef.on('child_added', function (data) {
          var newMessage = [Object.assign({}, data.val(), {key: data.key})]
          dispatch({type: types.LOAD_NEW_MESSAGES_SUCCESS, newMessage})
        })
      } catch (err) {
        console.log('loadNewMessages error', err)
        dispatch({type: types.LOAD_NEW_MESSAGES_FAILURE})
      }
    } catch (err) {
      console.log('loadMessages error', err)
      dispatch({type: types.INITIAL_LOAD_MESSAGES_FAILURE})
    }
  }
}

export function loadOldMessages (threadId, oldestMsgKey) {
  return async function (dispatch) {
    try {
      dispatch({type: types.LOAD_OLD_MESSAGES_ATTEMPT})
      var threadRef = db.ref('/messages/' + threadId).orderByKey().endAt(oldestMsgKey).limitToLast(21)
      let msgObject = await threadRef.once('value')
      var msgs = Object.keys(msgObject.val()).map(function (key) {
        return Object.assign({}, msgObject.val()[key], {key: key})
      })
      msgs.pop()
      var oldMessages = {
        oldestMsgKey: msgs.length > 0 ? msgs[0].key : null,
        messages: msgs.reverse()
      }
      dispatch({type: types.LOAD_OLD_MESSAGES_SUCCESS, oldMessages})
    } catch (err) {
      console.log(err)
      dispatch({type: types.LOAD_OLD_MESSAGES_FAILURE})
    }
  }
}

export function loadThreadList () {
  return async function (dispatch) {
    try {
      dispatch({type: types.LOAD_THREAD_LIST_ATTEMPT})

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
        dispatch({type: types.LOAD_THREAD_LIST_SUCCESS, threads})
      })
    } catch (err) {
      console.log(err)
      dispatch({type: types.LOAD_THREAD_LIST_FAILURE})
    }
  }
}

export function sendMessage (message, senderId, threadId) {
  return async function (dispatch) {
    try {
      dispatch({type: types.SEND_MESSAGE_ATTEMPT})
      let prevMsg = await db.ref('/messages/' + threadId).limitToLast(1).once('value')
      var prevMsgKey = Object.keys(prevMsg.val())[0]
      var updatedPrevMsg = Object.assign({}, prevMsg.val()[prevMsgKey], {
        nextSenderId: senderId,
        nextMessageTimestamp: Date.now()
      })

      var newMsgKey = db.ref('/messages').push().key
      var newMsgData = {
        message: message,
        senderId: senderId,
        timestamp: Date.now(),
        prevSenderId: updatedPrevMsg.senderId,
        prevMessageTimestamp: updatedPrevMsg.timestamp
      }

      var updates = {}
      updates['/messages/' + threadId + '/' + prevMsgKey] = updatedPrevMsg
      updates['/messages/' + threadId + '/' + newMsgKey] = newMsgData
      updates['/threads/' + threadId + '/last_message'] = newMsgData

      await db.ref().update(updates)
      dispatch({type: types.SEND_MESSAGE_SUCCESS})
    } catch (err) {
      console.log(err)
      dispatch({type: types.SEND_MESSAGE_FAILURE})
    }
  }
}
