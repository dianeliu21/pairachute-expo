import React, { Component } from 'react'
import {
  Button,
  KeyboardAvoidingView,
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'
import MaterialInitials from 'react-native-material-initials/native'
import MessageBubble from './MessageBubble'
const constants = require('../../../styles/constants.js')
const styles = require('../../../styles/styles.js')

class PromptResponse extends Component {
  constructor (props) {
    super(props)
    this.state = {
      behavior: 'padding',
      modalVisible: false,
      pressedBubbles: {},
      pressedResponses: {},
      promptAnswerText: ''
    }

    this.prompt = this.props.data.promptInfo.message.length > 100 ? '"' + this.props.data.promptInfo.message.substr(0, 100) + '..."' : '"' + this.props.data.promptInfo.message + '"'
    this.senderName = this.props.users[this.props.data.responseInfo.senderId].name
  }

  _changeModalVisibility (visible) {
    this.setState({modalVisible: visible})
  }

  _displayResponse () {
    var message = Object.assign({}, this.props.data, {
      message: this.props.data.responseInfo.response,
      senderId: this.props.data.responseInfo.senderId,
      nextSenderId: this.props.data.nextSenderId,
      prevSenderId: this.props.data.prevSenderId,
      timestamp: this.props.data.timestamp,
      prevMessageTimestamp: this.props.data.prevMessageTimestamp,
      nextMessageTimestamp: this.props.data.nextMessageTimestamp,

    })
    // console.log('displaying response', message)
    return(<MessageBubble users={this.props.users} senderId={this.props.senderId} message={message}/>)
  }

  _getResponsesOrTextInput () {
    if (this.props.data.promptInfo.responseOptions) {
      return (
        <View style={styles.flexColumnCenter}>
          <Text>ided some responses, wont show input</Text>
          {this._promptResponses()}
        </View>
      )
    }
    return (
      <View style={styles.flexRowCenter}>
        <TextInput
          multiline
          onChangeText={(promptAnswerText) => this.setState({promptAnswerText})}
          placeholder={'Write your response here'}
          style={styles.promptAnswerInput}
          value={this.state.promptAnswerText}
        />
      </View>
    )
  }

  _promptResponses () {
    if (this.props.data.promptInfo.responseOptions) {
      return Object.entries(this.props.data.promptInfo.responseOptions).map(item =>
        (<View key={item[0]} style={[styles.promptResponseItem, this.state.pressedBubbles[item[0]] === true ? styles.responsePressed : null]}>
          <TouchableHighlight
            onPress={() => this._toggleBubblePress(item[0], item[1])}
            underlayColor={'rgba(255,255,255,0)'}
          >
            <Text>{item[1]}</Text>
          </TouchableHighlight>
        </View>)
      )
    }
    return null
  }

  render () {
    return (
      <View>
        <View style={styles.promptResponseContainer}>
          <Text style={styles.promptResponseHeader}>
            <Text style={{fontWeight: 'bold'}}>{this.senderName}</Text> responded to the prompt {this.prompt}
          </Text>
          {this._displayResponse()}
        </View>
      </View>
    )
  }
}

module.exports = PromptResponse
