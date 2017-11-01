import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changePassword } from '../../actions/authActions'

import React, { Component } from 'react'
import {
  Button,
  Text,
  TextInput,
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
      password: '',
      passwordMatch: true,
    }
  }

  verifyPassword (password) {
    password === this.state.password ? this.setState({passwordMatch: true}) : this.setState({passwordMatch: false})
  }

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.wrapper}
        resetScrollToCoords={{x: 0, y: 0}}
        style={{backgroundColor: 'white'}}
      >
        <View style={styles.container}>
        <Text style={styles.f_30}>Change Password</Text>
        <Text>{this.props.authState.changePasswordSuccessMessage}</Text>
        <Text>{this.props.authState.changePasswordFailureMessage}</Text>
        <TextInput
          onChangeText={(password) => this.setState({password})}
          placeholder={'New Password'}
          secureTextEntry
          style={[styles.authInput, {width: this.state.screenWidth - 20}]}
        />
        <TextInput
          onChangeText={(password2) => this.verifyPassword(password2)}
          placeholder={'Verify New Password'}
          secureTextEntry
          style={[styles.authInput, this.state.passwordMatch ? null : styles.authInputIncorrect, {width: this.state.screenWidth - 20}]}
        />
        <Button
          onPress={() => this.props.changePassword(this.state.password)}
          title={'Change Password'}
        />
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
