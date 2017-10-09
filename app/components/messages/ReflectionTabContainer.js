import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadMessages, loadOldMessages, sendMessage, submitPromptResponse } from '../../actions/messagesActions'

import ReflectionTab from './tabs/ReflectionTab'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    reflectionOnlyThread: state.reflectionOnlyThread,
    chatType: 'reflectionOnly'
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

const ReflectionTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReflectionTab)

export default ReflectionTabContainer
