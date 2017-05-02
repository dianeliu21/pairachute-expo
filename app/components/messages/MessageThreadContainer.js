import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { initialLoadMessages, loadNewMessages, sendMessage } from '../../actions/messagesActions'

import MessageThread from './MessageThread'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    focusedThread: state.focusedThread
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    initialLoadMessages,
    loadNewMessages,
    sendMessage
  }, dispatch)
}

const MessagesThreadContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageThread)

export default MessagesThreadContainer
