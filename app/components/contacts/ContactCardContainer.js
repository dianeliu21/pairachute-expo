import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContactCard from './ContactCard'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    focusedContact: state.focusedContact
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

const ContactCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactCard)

export default ContactCardContainer
