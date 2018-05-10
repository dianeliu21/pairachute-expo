import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { navToChangeAvatar, navToChangePassword } from '../../actions/authActions'

import Settings from './Settings'

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    navToChangeAvatar,
    navToChangePassword
  }, dispatch)
}

const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)

export default SettingsContainer
