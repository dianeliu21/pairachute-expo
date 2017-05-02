import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { loadContacts } from '../../actions/contactsActions'

import ComposeMessage from './ComposeMessage'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    contacts: state.contacts
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadContacts
  }, dispatch)
}

const ComposeMessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposeMessage)

export default ComposeMessageContainer
