import * as types from './actionTypes'
import { NavigationActions } from 'react-navigation'
import fb from '../config/initializeFirebase'

var db = fb.database()

export function loadMessages (type, threadId) {
  return async function (dispatch) {
    try {
      // load existing messages
      dispatch({type: types.INITIAL_LOAD_MESSAGES_ATTEMPT})

      let threadInfo = (await db.ref('/threads/' + threadId).once('value')).val()
      var msgRef = db.ref('/messages/' + threadId).limitToLast(20)
      let msgObject = await msgRef.once('value')

      var msgs
      if (msgObject.val() === null) {
        msgs = []
      } else {
        msgs = Object.keys(msgObject.val()).map(function (key) {
          return Object.assign({}, msgObject.val()[key], {key: key})
        })
      }
      console.log('this is thread id', threadId)

      var focusedThread = {
        id: threadId,
        oldestMsgKey: msgs.length > 0 ? msgs[0].key : null,
        messages: msgs.reverse(),
        users: threadInfo.users,
      }

      console.log('here2')
      if (type === 'chatOnly') {
        dispatch({type: types.INITIAL_LOAD_CHAT_ONLY_MESSAGES_SUCCESS, focusedThread})
      } else if (type === 'reflectionOnly') {
        dispatch({type: types.INITIAL_LOAD_REFLECTION_ONLY_MESSAGES_SUCCESS, focusedThread})
      } else {
        dispatch({type: types.INITIAL_LOAD_REFLECTION_AND_CHAT_MESSAGES_SUCCESS, focusedThread})
      }
      // dispatch(NavigationActions.navigate({routeName: 'Message', params: {title: focusedThread.title}}))

      // listen for new messages
      try {
        dispatch({type: types.LOAD_NEW_MESSAGES_ATTEMPT})
        var newMsgRef = db.ref('/messages/' + threadId).limitToLast(1)
        newMsgRef.on('child_added', function (data) {
          var newMessage = [Object.assign({}, data.val(), {key: data.key})]
          if (type === 'chatOnly') {
            dispatch({type: types.LOAD_NEW_CHAT_ONLY_MESSAGES_SUCCESS, newMessage})
          } else if (type === 'reflectionOnly') {
            dispatch({type: types.LOAD_NEW_REFLECTION_ONLY_MESSAGES_SUCCESS, newMessage})
          } else {
            dispatch({type: types.LOAD_NEW_REFLECTION_AND_CHAT_MESSAGES_SUCCESS, newMessage})
          }
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

export function loadOldMessages (type, threadId, oldestMsgKey) {
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
      if (type === 'chatOnly') {
        dispatch({type: types.LOAD_OLD_CHAT_ONLY_MESSAGES_SUCCESS, oldMessages})
      } else if (type === 'reflectionOnly') {
        dispatch({type: types.LOAD_OLD_REFLECTION_ONLY_MESSAGES_SUCCESS, oldMessages})
      } else {
        dispatch({type: types.LOAD_OLD_REFLECTION_AND_CHAT_MESSAGES_SUCCESS, oldMessages})
      }
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
              let firstName = await db.ref('/users/' + userids[i] + '/firstName').once('value')
              let lastName = await db.ref('/users/' + userids[i] + '/lastName').once('value')
              var name = firstName.val() + ' ' + lastName.val()
              users[userids[i]] = name
              if (userids[i] !== uid) names.push(name)
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
      var updates = {}

      let prevMsg = await db.ref('/messages/' + threadId).limitToLast(1).once('value')

      var prevMsgKey
      var updatedPrevMsg
      if (prevMsg.val() === null) {
        prevMsgKey = null
        updatedPrevMsg = {
          senderId: null,
          timestamp: null,
        }
      } else {
        prevMsgKey = Object.keys(prevMsg.val())[0]
        updatedPrevMsg = Object.assign({}, prevMsg.val()[prevMsgKey], {
          nextSenderId: senderId,
          nextMessageTimestamp: Date.now()
        })
        updates['/messages/' + threadId + '/' + prevMsgKey] = updatedPrevMsg
      }

      var newMsgKey = db.ref('/messages').push().key
      var newMsgData = {
        message: message,
        senderId: senderId,
        timestamp: Date.now(),
        prevSenderId: updatedPrevMsg.senderId,
        prevMessageTimestamp: updatedPrevMsg.timestamp
      }

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

export function submitPromptResponse (prompt, response, senderId, threadId) {
  return async function (dispatch) {
    try {
      dispatch({type: types.SUBMIT_PROMPT_RESPONSE_ATTEMPT})

      console.log('inputs', prompt, response, senderId, threadId)

      let prevMsg = await db.ref('/messages/' + threadId).limitToLast(1).once('value')
      var prevMsgKey = Object.keys(prevMsg.val())[0]
      var updatedPrevMsg = Object.assign({}, prevMsg.val()[prevMsgKey], {
        nextSenderId: 'promptResponse',
        nextMessageTimestamp: Date.now()
      })

      var promptInfo = {
        key: prompt.key,
        message: prompt.message,
      }

      var responseInfo = {
        senderId: senderId,
      }

      responseInfo['response'] = response


      let promptObj = await db.ref('/messages/' + threadId + '/' + prompt.key).once('value')
      var promptUpdate = {}
      promptUpdate[senderId] = responseInfo.response
      var updatedPrompt = Object.assign({}, promptObj.val(), {
        responses: promptObj.val().responses ? Object.assign({}, promptObj.val().responses, promptUpdate) : promptUpdate
      })

      var newMsgKey = db.ref('/messages').push().key
      var newMsgData = {
        type: 'promptResponse',
        senderId: 'promptResponse',
        promptInfo: promptInfo,
        responseInfo: responseInfo,
        timestamp: Date.now(),
        prevSenderId: updatedPrevMsg.senderId,
        prevMessageTimestamp: updatedPrevMsg.timestamp
      }

      var updates = {}
      updates['/messages/' + threadId + '/' + prevMsgKey] = updatedPrevMsg
      updates['/messages/' + threadId + '/' + newMsgKey] = newMsgData
      updates['/messages/' + threadId + '/' + prompt.key] = updatedPrompt

      await db.ref().update(updates)
    } catch (err) {
      console.log(err)
      dispatch({type: types.SUBMIT_PROMPT_RESPONSE_FAILURE})
    }
  }
}
