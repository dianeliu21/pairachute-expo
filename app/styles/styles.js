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
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
    margin: 0,
    padding: 0
  },

  // Flexbox
  alignItemsStretch: {
    alignItems: 'stretch',
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
  justifyContentCenter: {
    justifyContent: 'center'
  },

  // Text styles
  f_40: {
    fontSize: 40,
  },
  f_30: {
    fontSize: 30,
  },
  f_20: {
    fontSize: 20,
  },
  smallHelpCenter: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center'
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    margin: 10
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    margin: 10
  },


  // Colors
  backgroundPastelBlue: {
    backgroundColor: constants.pastelBlue
  },
  backgroundOrange: {
    backgroundColor: constants.orange
  },
  backgroundTeal: {
    backgroundColor: constants.teal
  },
  colorPastelBlue: {
    color: constants.pastelBlue
  },
  colorTeal: {
    color: constants.teal
  },
  colorWhite: {
    color: 'white'
  },

  // Borders
  borderGray: {
    borderColor: constants.mediumGray,
  },
  borderTopBottom: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  borderTop: {
    borderTopWidth: 1,
  },

  // Margins and Padding
  marginFive: {
    margin: 5,
  },
  margin_10: {
    margin: 10,
  },
  paddingTen: {
    padding: 10
  },
  padding_10: {
    padding: 10,
  },
  padding_50: {
    padding: 50
  },

  // Login/Signup and Auth
  authButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'white',
    margin: 20

  },
  authErrorText: {
    color: 'red',
    textAlign: 'center',
    margin: 10
  },
  authInput: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 10,
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
  authContainerColor: {
    backgroundColor: constants.pastelBlue,
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
    paddingTop: 10,
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
    borderRadius: 15,
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
    backgroundColor: constants.teal
  },
  sentMessageText: {
    color: 'white',
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
  messageThreadInput: {
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 0.5,
    fontSize: 16,
    margin: 10,
    marginRight: 0,
    padding: 10,
    paddingTop: 5,
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
