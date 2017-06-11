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
const constants = require('../../styles/constants.js')
const styles = require('../../styles/styles.js')

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
    this.promptResponses = this._promptResponses()
    this.senderName = this.props.users[this.props.data.responseInfo.senderId]
  }

  componentDidMount () {
    if (this.props.data.responseOptions) {
      var entries = Object.entries(this.props.data.responseOptions)
      var bubbles = {}
      var responses = {}
      entries.forEach(function (entry) {
        bubbles[entry[0]] = false
        responses[entry[1]] = false
      })

      this.setState({
        pressedBubbles: bubbles,
        pressedResponses: responses
      })
    }
  }

  _changeModalVisibility (visible) {
    this.setState({modalVisible: visible})
  }

  _displayResponse () {
    if (this.props.data.promptInfo.responseOptions) {
      var entries = Object.entries(this.props.data.responseInfo.response)
      return entries.map(item =>
        (<View key={item[0]} style={styles.promptResponseItem}>
          <Text>{item[1]}</Text>
        </View>)
      )
    }
    var message = Object.assign({}, this.props.data, {
      message: this.props.data.responseInfo.response,
      senderId: this.props.data.responseInfo.senderId
    })
    return(<MessageBubble users={this.props.users} sender_id={this.props.senderId} message={message}/>)
  }

  _getResponsesOrTextInput () {
    if (this.promptResponses !== null) {
      return (
        <View style={styles.flexColumnCenter}>
          {this.promptResponses}
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

  _promptResponses = () => {
    if (this.props.data.responseOptions) {
      return Object.entries(this.props.data.responseOptions).map(item =>
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

  _submitPromptResponse () {
    if (this.props.data.promptInfo.responseOptions) {
      response = this.state.pressedResponses
    } else {
      response = this.state.promptAnswerText
    }
    this.props.submitPromptResponse(this.props.data.promptInfo, response, this.props.senderId, this.props.threadId)
    this.setState({promptAnswerText: '', pressedResponses: {}, pressedBubbles: {}})
    this._changeModalVisibility(false)
  }

  render () {
    return (
      <View>
        <Modal
          animationType={'fade'}
          transparent
          visible={this.state.modalVisible}
        >
          <KeyboardAvoidingView behavior={this.state.behavior} style={styles.darkenedBackgroundOverlay}>
            <View style={styles.promptResponseModal}>
              <View style={styles.promptModalHeaderContainer}>
                <Text style={styles.promptModalHeading}>Pairachute Prompt</Text>
              </View>
              <View style={styles.promptTextContainer}>
                <Text>{this.props.data.promptInfo.message}</Text>
              </View>
              {this._getResponsesOrTextInput()}
              <View style={styles.flexRowCenter}>
                <Button
                  onPress={() => this._changeModalVisibility(false)}
                  style={styles.promptModalButton}
                  title={'Cancel'}
                />
                <Button
                  onPress={() => this._submitPromptResponse()}
                  style={styles.promptModalButton}
                  title={'Submit'}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        <View style={styles.promptResponseContainer}>
          <TouchableHighlight
            onPress={() => this._changeModalVisibility(true)}
            underlayColor={'rgba(255,255,255,0)'}
          >
            <Text style={styles.promptResponseHeader}>
              <Text style={{fontWeight: 'bold'}}>{this.senderName}</Text> responded to the prompt {this.prompt} <Text style={{color: 'blue'}}>See prompt</Text>
            </Text>
          </TouchableHighlight>
          {this._displayResponse()}
        </View>
      </View>
    )
  }
}

module.exports = PromptResponse
