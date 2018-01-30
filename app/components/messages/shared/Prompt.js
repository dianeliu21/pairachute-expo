import React, {Component} from 'react'
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
const constants = require('../../../styles/constants.js')
const styles = require('../../../styles/styles.js')

class Prompt extends Component {
  constructor (props) {
    super(props)
    this.state = {
      behavior: 'padding',
      modalVisible: false,
      pressedBubbles: {},
      pressedResponses: {},
      promptAnswerText: ''
    }

    this.promptResponses = this._promptResponses()
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

  _getResponsesOrTextInput () {
    if (this.promptResponses !== null) {
      return (
        <View style={styles.flexColumnCenter}>
          {this.touchablePromptResponses()}
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
      var entries = Object.entries(this.props.data.responseOptions)
      return entries.map(item =>
        (<View key={item[0]} style={styles.promptResponseItem}>
          <Text>{item[1]}</Text>
        </View>)
      )
    }
    return null
  }

  touchablePromptResponses () {
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
    if (this.props.data.responseOptions) {
      response = this.state.pressedBubbles
    } else {
      response = this.state.promptAnswerText
    }
    this.props.submitPromptResponse(this.props.data, response, this.props.senderId, this.props.threadId)
    this.setState({promptAnswerText: '', pressedResponses: {}, pressedBubbles: {}})
    this._changeModalVisibility(false)
  }

  _toggleBubblePress (key, response) {
    var bubbles = this.state.pressedBubbles
    bubbles[key] = !this.state.pressedBubbles[key]

    var responses = this.state.pressedResponses
    responses[response] = !this.state.pressedResponses[response]

    this.setState({
      pressedBubbles: bubbles,
      pressedResponses: responses
    })
  }

  _unanswered () {
    return (
      <TouchableHighlight
        onPress={() => this.props.updateFocusedPrompt(this.props.data)}
        underlayColor={'rgba(255,255,255,0)'}
      >
        <View>
          {this.promptResponses}
          <View style={styles.promptAnswerButton}>
            <Text style={styles.promptAnswerButtonText}>Answer</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  _answered () {
    return (
      <View>
      {this.promptResponses}
      <View style={styles.promptDoneButton}>
        <Text style={styles.promptDoneButtonText}>Done!</Text>
      </View>
    </View>
    )
  }

  _renderPromptDate () {
    timestamp = this.props.data.timestamp
    console.log('timestamp')
    console.log(timestamp)
    console.log(Date(timestamp * 1000))
    date = Date(timestamp * 1000)
    return date.toString().slice(0,10);
  }

  render () {
    answered = (this.props.senderId in this.props.data.responses)
    return (
      <View>
        <Modal
          animationType={'fade'}
          transparent
          visible={this.state.modalVisible}
        >
          <KeyboardAvoidingView behavior={this.state.behavior} style={[styles.darkenedBackgroundOverlay, {borderColor: 'black'}]}>
            <View style={styles.promptResponseModal}>
              <View style={styles.promptModalHeaderContainer}>
                <Text style={styles.promptModalHeading}>Pairachute Prompt</Text>
              </View>
              <View style={styles.promptTextContainer}>
                <Text>{this.props.data.message}</Text>
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
        <View style={[styles.promptContainer, styles.backgroundOrange]}>
          <View style={styles.promptHeadingContainer}>
            <MaterialInitials
              backgroundColor={(answered) ? constants.promptDoneButtonColor : '#659EFF'}
              color={'white'} size={25} text={'Pairachute'} />
            <Text style={styles.promptHeading}>Pairachute Prompt</Text>
          </View>
          <Text style={styles.promptTimestamp}>{this._renderPromptDate()}</Text>
          <View style={styles.promptTextContainer}>
            <Text style={{color: 'white'}}>{this.props.data.message}</Text>
          </View>
          {answered ? this._answered() : this._unanswered()}
        </View>
      </View>
    )
  }
}

// onPress={() => this.props.updateFocusedPrompt(this.props.data.message)}

module.exports = Prompt
