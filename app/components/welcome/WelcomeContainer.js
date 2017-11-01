import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { navToHome } from '../../actions/navActions'
import { registerForPushNotificationsAsync } from '../../actions/authActions'

import Welcome from './Welcome'

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    navToHome,
    registerForPushNotificationsAsync
  }, dispatch)
}

const WelcomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome)

export default WelcomeContainer
