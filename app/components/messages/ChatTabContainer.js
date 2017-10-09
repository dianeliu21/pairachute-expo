import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadMessages, loadOldMessages, sendMessage, submitPromptResponse } from '../../actions/messagesActions'

import ChatTab from './tabs/ChatTab'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatOnlyThread: state.chatOnlyThread,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadMessages,
    loadOldMessages,
    sendMessage,
    submitPromptResponse
  }, dispatch)
}

const ChatTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatTab)

export default ChatTabContainer
