import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changePassword } from '../../actions/authActions'

import React, { Component } from 'react'
import {
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const styles = require('../../styles/styles.js')

class ChangePassword extends Component {
  static navigationOptions = {
    title: 'Change Password'
  }

  constructor(props) {
    super(props)
    this.state = {
      displayMessages: true,
      password: '',
      passwordMatch: true,
    }
  }

  _handleSubmit () {
    this.setState({displayMessages: true})
    this.props.changePassword(this.state.password)
  }

  verifyPassword (password) {
    this.setState({displayMessages: false})
    password === this.state.password ? this.setState({passwordMatch: true}) : this.setState({passwordMatch: false})
  }

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.wrapper}
        resetScrollToCoords={{x: 0, y: 0}}
        style={styles.backgroundRightpointRed}
      >
        <View style={[styles.container, styles.backgroundRightpointRed]}>
        <Text style={[styles.f_30, styles.colorWhite]}>Change Password</Text>
        <Text style={styles.successMessage}>{this.state.displayMessages && this.props.authState.changePasswordSuccessMessage}</Text>
        <Text style={styles.errorMessage}>{this.state.displayMessages && this.props.authState.changePasswordFailureMessage}</Text>
        <TextInput
          onChangeText={(password) => this.setState({password: password, displayMessages: false})}
          placeholder={'New Password'}
          secureTextEntry
          style={[styles.authInput, {width: this.state.screenWidth - 20}]}
        />
        <TextInput
          onChange={this._handleChange}
          onChangeText={(password2) => this.verifyPassword(password2)}
          placeholder={'Verify New Password'}
          secureTextEntry
          style={[styles.authInput, this.state.passwordMatch ? null : styles.authInputIncorrect, {width: this.state.screenWidth - 20}]}
        />
        <TouchableHighlight
          style={[styles.settingsButtonInverted, {marginTop: 10}]}
          onPress={() => this._handleSubmit()}>
          <Text style={styles.settingsButtonTextInverted}> Change Password </Text>
        </TouchableHighlight>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authState: state.authState,
    user: state.user,
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({changePassword}, dispatch)
}

const ChangePasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword)

export default ChangePasswordContainer
