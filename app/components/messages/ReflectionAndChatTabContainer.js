import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadMessages, loadOldMessages, sendMessage, submitPromptResponse } from '../../actions/messagesActions'

import ReflectionAndChatTab from './tabs/ReflectionAndChatTab'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    focusedThread: state.focusedThread,
    chatType: 'reflectionAndChat'
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

const ReflectionAndChatTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReflectionAndChatTab)

export default ReflectionAndChatTabContainer
