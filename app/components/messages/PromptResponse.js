import React, { Component } from 'react'
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native'
const styles = require('../../styles/styles.js')

class PromptResponse extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pressed: false
    }
  }

  _handlePress () {
    this.setState({pressed: !this.state.pressed})
  }

  render () {
    return (
      <TouchableHighlight onPress={() => this._handlePress()}>
        <View style={[styles.promptResponseItem, this.state.pressed ? styles.responsePressed : null]}>
          <Text>{this.props.responseText}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

module.exports = PromptResponse
