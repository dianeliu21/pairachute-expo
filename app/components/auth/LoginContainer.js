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
  TouchableHighlight,
  View
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const styles = require('../../styles/styles.js')

var reactNative = require('react-native');
var {
  AsyncStorage
} = reactNative;

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      behavior: 'padding',
      email: '',
      loginDisabled: false,
      password: '',
      loginText: 'Login',
      screenWidth: 0
    }
  }

  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    var email;
    var password;
    AsyncStorage.multiGet(['email', 'password']).then((data) => {
      if (data[0][1]) {
        email = data[0][1]
        password = data[1][1]
        this.setState({
          email: email,
          password: password
        })
        this._login()
      }
    })
  }

  async _login() {
    this.setState({
      loginText: 'Logging In...',
      loginDisabled: true
    })
    await this.props.login(this.state.email, this.state.password)
    this.setState({
      loginText: 'Login',
      loginDisabled: false
    })
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
              title={this.state.loginText}/>
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
