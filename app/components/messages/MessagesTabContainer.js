import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadThreadList, initialLoadMessages, loadNewMessages } from '../../actions/messagesActions'

import MessagesTab from './MessagesTab'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    threads: state.threads
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadThreadList,
    initialLoadMessages,
    loadNewMessages
  }, dispatch)
}

const MessagesTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesTab)

export default MessagesTabContainer
