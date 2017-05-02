import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signup, switchSignupToLogin } from '../../actions/authActions'

// Signup component
import React, { Component } from 'react'
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput
} from 'react-native'
const styles = require('../../styles/styles.js')

export class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      password: '',
      passwordMatch: true,
      behavior: 'padding'
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
      <KeyboardAvoidingView behavior={this.state.behavior} style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.authTitle}>New Account</Text>
          <Text style={styles.authErrorText}>{this.props.authState.errorMessage}</Text>
          <TextInput
            onChangeText={(firstName) => this.setState({first_name: firstName})}
            placeholder='First Name'
            style={styles.authInput}
          />
          <TextInput
            onChangeText={(lastName) => this.setState({last_name: lastName})}
            placeholder='Last Name'
            style={styles.authInput}
          />
          <TextInput
            onChangeText={(email) => this.setState({email})}
            placeholder='Email Address'
            style={styles.authInput}
          />
          <TextInput
            onChangeText={(phoneNumber) => this.setState({phone_number: phoneNumber})}
            placeholder='Phone Number'
            style={styles.authInput}
          />
          <TextInput
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            secureTextEntry
            style={styles.authInput}
          />
          <TextInput
            onChangeText={(password2) => this.verifyPassword(password2)}
            placeholder='Verify Password'
            secureTextEntry
            style={[styles.authInput, this.state.passwordMatch ? null : styles.authInputIncorrect]}
          />
          <Button
            onPress={() => this.props.signup(this.state.first_name, this.state.last_name, this.state.email, this.state.phone_number, this.state.password)}
            title='Sign Up'
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
