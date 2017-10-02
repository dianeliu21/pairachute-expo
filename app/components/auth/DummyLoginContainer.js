import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../../actions/authActions'
import React, { Component } from 'react'
import {
  Button,
  Text,
  View
} from 'react-native'
import * as secrets from '../../config/secrets.js'
const styles = require('../../styles/styles.js')

class DummyLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginDisabled: false,
    }
  }

  static navigationOptions = {
    header: null,
  }

  async _login (email, password) {
    this.setState({ loginDisabled: true })
    await this.props.login(email, password)
    this.setState({ loginDisabled: false })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.authTitle}>Pairachute</Text>
        <Text>Dummy Login - for testing purposes only</Text>
        <Button
          disabled={this.state.loginDisabled}
          onPress={() => this._login(secrets.TEST_EMAIL, secrets.TEST_PASSWORD)}
          title={'Log In'}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authState: state.authState
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({login}, dispatch)
}

const DummyLoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DummyLogin)

export default DummyLoginContainer
