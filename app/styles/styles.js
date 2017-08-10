const React = require('react-native')
const { StyleSheet } = React
const constants = require('./constants.js')

const styles = StyleSheet.create({
  // General Styles
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    margin: 0,
    padding: 0
  },
  darkenedBackgroundOverlay: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    flex: 1
  },
  flexColumn: {
    flexDirection: 'column'
  },
  flexColumnCenter: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  flexColumnEnd: {
    alignItems: 'flex-end',
    flexDirection: 'column'
  },
  flexRowCenter: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  flexRowEnd: {
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
    margin: 0,
    padding: 0
  },

  // Login/Signup and Auth
  authButton: {
    margin: 5
  },
  authErrorText: {
    color: 'red',
    textAlign: 'center',
    margin: 10
  },
  authInput: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 50,
    margin: 10,
    padding: 10
  },
  authInputCorrect: {
    borderColor: 'green',
    borderWidth: 2
  },
  authInputIncorrect: {
    borderColor: 'red',
    borderWidth: 2
  },
  authTitle: {
    fontSize: 40,
    textAlign: 'center'
  },

  // TabBar Styles
  tabBar: {
    backgroundColor: 'white',
    borderColor: '#b7b7b7',
    borderWidth: 0.5,
    opacity: 1
  },

  // Messaging //
  inverted: {
    transform: [
      {scaleY: -1}
    ]
  },

  // Message List
  messageListContainer: {
    // marginTop: 60
  },
  messageListRow: {
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 0.5,
    flexDirection: 'row',
    padding: 15
  },
  messageListRowPreview: {
    color: 'gray',
    fontSize: 14
  },
  messageListRowTitle: {
    color: 'black',
    fontSize: 16,
    marginBottom: 2
  },
  messageListTextWrapper: {
    paddingLeft: 10
  },
  loadOldMessageButton: {
    alignSelf: 'center',
    borderColor: constants.mediumGray,
    borderWidth: 1,
    margin: 10,
    padding: 10
  },

  // Message Bubble
  messageAvatar: {
    marginBottom: 2
  },
  messageBubble: {
    borderRadius: 10,
    marginTop: 2
  },
  messageDate: {
    color: 'gray',
    fontSize: 12,
    marginTop: 15,
    textAlign: 'center'
  },
  messageTimestamp: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    color: 'gray',
    fontSize: 10,
    margin: 5
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F0F0',
    marginLeft: 5
  },
  receivedMessageSender: {
    alignSelf: 'flex-start',
    color: 'gray',
    fontSize: 12,
    marginBottom: 2,
    marginLeft: 50,
    marginTop: 10
  },
  receivedMessageText: {
    color: 'black',
    fontSize: 16,
    margin: 10
  },
  receivedMsgBubbleWrapper: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginLeft: 40,
    marginRight: 100
  },
  receivedMsgWithAvatar: {
    marginBottom: 10,
    marginLeft: 10
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: constants.sentMessageColor
  },
  sentMessageText: {
    color: 'black',
    fontSize: 16,
    margin: 10
  },
  sentMsgBubbleWrapper: {
    alignItems: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: 100,
    marginRight: 10
  },

  // Message input
  messageInputView: {
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 0.5,
    flexDirection: 'row'
  },
  messageTextInput: {
    fontSize: 16,
    height: 50,
    padding: 10
  },

  // Prompts
  promptAnswerButton: {
    alignSelf: 'center',
    backgroundColor: constants.promptAnswerButtonColor,
    padding: 10
  },
  promptAnswerButtonText: {
    fontWeight: 'bold',
    color: 'white'
  },
  promptAnswerInput: {
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    fontSize: 16,
    height: 200,
    margin: 10,
    padding: 10
  },
  promptContainer: {
    alignItems: 'center',
    backgroundColor: constants.promptBackgroundColor,
    // borderBottomWidth: 1,
    // borderColor: '#d3d3d3',
    // borderTopWidth: 1,
    marginBottom: 15,
    // marginLeft: 5,
    // marginRight: 5,
    marginTop: 15,
    padding: 20
  },
  promptHeading: {
    color: 'grey',
    fontSize: 14,
    marginLeft: 5
  },
  promptHeadingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5
  },
  promptModalButton: {
    flex: 0.5
  },
  promptModalHeaderContainer: {
    alignItems: 'center',
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 25,
    paddingTop: 25
  },
  promptModalHeading: {
    color: 'white',
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  promptResponseContainer: {
    borderColor: constants.mediumGray,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  promptResponseHeader: {
    color: 'grey',
    fontSize: 12,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center'
  },
  promptResponseItem: {
    backgroundColor: 'white',
    borderColor: constants.mediumGray,
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    padding: 10
  },
  promptResponseModal: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    flex: 1,
    flexDirection: 'column',
    marginBottom: 100,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 100,
    overflow: 'hidden'
  },
  promptResponseSubmit: {
    fontSize: 14
  },
  promptTextContainer: {
    padding: 10
  },
  responsePressed: {
    backgroundColor: constants.mediumGray
  },
  dummy:{
    backgroundColor: 'red'
  }
})

module.exports = styles
