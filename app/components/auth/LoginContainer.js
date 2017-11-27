import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login, switchLoginToSignup } from '../../actions/authActions'

// Login component
import React, { Component } from 'react'
import {
  Image,
  Button,
  Text,
  TextInput,
  View
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const styles = require('../../styles/styles.js')

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      behavior: 'padding',
      email: '',
      loginDisabled: false,
      password: '',
      screenWidth: 0
    }
  }

  static navigationOptions = {
    header: null
  }

  async _login() {
    this.setState({ loginDisabled: true })
    await this.props.login(this.state.email, this.state.password)
    this.setState({ loginDisabled: false })
  }

  render () {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.wrapper}
        resetScrollToCoords={{x: 0, y: 0}}
        style={{backgroundColor: 'white'}}
      >
        <View
          onLayout={(e) => { this.setState({screenWidth: e.nativeEvent.layout.width}) }}
          style={[styles.container, styles.authContainerColor]}
        >
          <Image
            style={{width: 200, height: 200}}
            source={require('./../../../resources/pairachute_graphic.png')}>
          </Image>
          <Text style={styles.authErrorText}>{this.props.authState.errorMessage}</Text>
          <TextInput
            onChangeText={(email) => this.setState({email})}
            placeholder={'Email Address'}
            style={[styles.authInput, {width: this.state.screenWidth - 20}]}
          />
          <TextInput
            onChangeText={(password) => this.setState({password})}
            placeholder={'Password'}
            secureTextEntry
            style={[styles.authInput, {width: this.state.screenWidth - 20}]}
          />
          <Button
            disabled={this.state.loginDisabled}
            onPress={() => this._login()}
            style={styles.authButton}
            color={'white'}
            title={'Log In'}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authState: state.authState
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({login, switchLoginToSignup}, dispatch)
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer
