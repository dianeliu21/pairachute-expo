const React = require('react-native')
const {StyleSheet} = React

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
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
    margin: 0,
    padding: 0
  },

  // Login/Signup and Auth
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

  ///////////////
  // Messaging //
  ///////////////

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

  // Message Bubble
  receivedMsgBubbleWrapperNoAvatar: {
    marginLeft: 40
  },
  receivedMsgBubbleWrapperWithAvatar: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginLeft: 10
  },
  messageAvatar: {
    marginBottom: 2
  },
  messageBubble: {
    borderRadius: 10,
    marginTop: 2,
    marginBottom: 2,
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F0F0',
    marginRight: 100,
    marginLeft: 5
  },
  receivedMessageSender: {
    alignSelf: 'flex-start',
    color: 'gray',
    fontSize: 12,
    marginBottom: 2,
    marginLeft: 45
  },
  receivedMessageText: {
    color: 'black',
    fontSize: 16
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084FF',
    marginLeft: 100
  },
  sentMessageText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'right'
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
  promptContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
    borderTopWidth: 1,
    margin: 5,
    padding: 10
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
  }
})

module.exports = styles
