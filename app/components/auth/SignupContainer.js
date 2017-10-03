import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signup, switchSignupToLogin } from '../../actions/authActions'

// Signup component
import React, { Component } from 'react'
import {
  Button,
  Text,
  TextInput,
  View
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const styles = require('../../styles/styles.js')

export class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordMatch: true,
      phone_number: '',
      screenWidth: 0
    }
  }

  static navigationOptions = {
    title: 'New Account'
  }

  verifyPassword (password) {
    password === this.state.password ? this.setState({passwordMatch: true}) : this.setState({passwordMatch: false})
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
          style={styles.container}
        >
          <Text style={styles.authTitle}>New Account</Text>
          <Text style={styles.authErrorText}>{this.props.authState.errorMessage}</Text>
          <TextInput
            onChangeText={(firstName) => this.setState({firstName: firstName})}
            placeholder={'First Name'}
            style={[styles.authInput, {width: this.state.screenWidth - 20}]}
          />
          <TextInput
            onChangeText={(lastName) => this.setState({lastName: lastName})}
            placeholder={'Last Name'}
            style={[styles.authInput, {width: this.state.screenWidth - 20}]}
          />
          <TextInput
            onChangeText={(email) => this.setState({email})}
            placeholder={'Email Address'}
            style={[styles.authInput, {width: this.state.screenWidth - 20}]}
          />
          <TextInput
            onChangeText={(phoneNumber) => this.setState({phone_number: phoneNumber})}
            placeholder={'Phone Number'}
            style={[styles.authInput, {width: this.state.screenWidth - 20}]}
          />
          <TextInput
            onChangeText={(password) => this.setState({password})}
            placeholder={'Password'}
            secureTextEntry
            style={[styles.authInput, {width: this.state.screenWidth - 20}]}
          />
          <TextInput
            onChangeText={(password2) => this.verifyPassword(password2)}
            placeholder={'Verify Password'}
            secureTextEntry
            style={[styles.authInput, this.state.passwordMatch ? null : styles.authInputIncorrect, {width: this.state.screenWidth - 20}]}
          />
          <Button
            onPress={() => this.props.signup(this.state.firstName, this.state.lastName, this.state.email, this.state.phone_number, this.state.password)}
            title={'Sign Up'}
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
  return bindActionCreators({signup, switchSignupToLogin}, dispatch)
}

const SignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup)

export default SignupContainer
