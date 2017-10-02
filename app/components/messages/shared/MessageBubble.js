import React, {Component} from 'react'
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import MaterialInitials from 'react-native-material-initials/native'
import * as constants from '../../../styles/constants.js'
const styles = require('../../../styles/styles.js')

class MessageBubble extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bubblePressed: false
    }
    // state variables
    this.isOwnMessage = this.props.message.senderId === this.props.sender_id
    this.isSameSenderAsNext = this.props.message.senderId === this.props.message.nextSenderId
    this.isSameSenderAsPrev = this.props.message.senderId === this.props.message.prevSenderId

    // variables calculated from state
    this.bubbleStyle = this.isOwnMessage ? styles.sentMessage : styles.receivedMessage
    this.bubbleTextStyle = this.isOwnMessage ? styles.sentMessageText : styles.receivedMessageText
    this.timestamp = this._parseTimestamp()

    // components
    this.date = this._renderDate()
    this.isSameDayAsNext = !this._notSameDayAsNext()
    this.avatar = !this.isOwnMessage && (!this.isSameSenderAsNext || (this.isSameSenderAsNext && !this.isSameDayAsNext))
      ? (<MaterialInitials backgroundColor={constants.mediumGray} color={'white'} single={false} size={constants.messageAvatarSize} style={styles.messageAvatar} text={this.props.users[this.props.message.senderId] || ''} />)
      : null
    this.senderName = !this.isOwnMessage && (!this.isSameSenderAsPrev || this.date !== null)
     ? (<Text style={styles.receivedMessageSender}>{this.props.users[this.props.message.senderId]}</Text>)
     : null

    this.wrapperStyle = !this.isOwnMessage ? !this.isSameSenderAsNext || this.avatar !== null ? [styles.receivedMsgBubbleWrapper, styles.receivedMsgWithAvatar] : [styles.receivedMsgBubbleWrapper] : styles.sentMsgBubbleWrapper
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.message !== nextProps.message) {
      this.timestamp = () => this._parseTimestamp()
      this.date = () => this._renderDate()
      this.isSameDayAsNext = () => this._sameDayAsNext()
    }
  }

  _parseTimestamp () {
    var time = new Date(this.props.message.timestamp)
    return time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  }

  _renderDate () {
    var currDate = new Date(this.props.message.timestamp)
    var prevDate = new Date(this.props.message.prevMessageTimestamp)
    return this.props.message.timestamp - this.props.message.prevMessageTimestamp > 86400000 || currDate.getDay() !== prevDate.getDay()
      ? <Text style={styles.messageDate}>{currDate.toLocaleDateString([], {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'}).toUpperCase()}</Text>
      : null
  }

  _renderTimestampLeft () {
    return this.isOwnMessage
      ? (<View>
        <Text style={styles.messageTimestamp}>{this._parseTimestamp()}</Text>
      </View>)
      : null
  }

  _renderTimestampRight () {
    return !this.isOwnMessage
      ? <View><Text style={styles.messageTimestamp}>{this._parseTimestamp()}</Text></View>
      : null
  }

  _notSameDayAsNext () {
    var currDate = new Date(this.props.message.timestamp)
    var nextDate = new Date(this.props.message.nextMessageTimestamp)
    return nextDate !== null && (this.props.message.nextMessageTimestamp - this.props.message.timestamp > 86400000 || currDate.getDay() !== nextDate.getDay())
  }

  _toggleBubblePress () {
    this.setState({bubblePressed: !this.state.bubblePressed})
  }

  render () {
    return (
      <View>
        {this.date}
        {this.senderName}
        <View style={this.wrapperStyle}>
          <View>
            <View style={styles.flexRowEnd}>
              {this.avatar}
              <TouchableHighlight
                onPress={() => this._toggleBubblePress()}
                underlayColor={'rgba(0,0,0,0)'}
              >
                <View style={[styles.messageBubble, this.bubbleStyle]}>
                  <Text style={this.bubbleTextStyle}>{this.props.message.message}</Text>
                </View>
              </TouchableHighlight>
            </View>
            {this.state.bubblePressed ? <Text style={styles.messageTimestamp}>{this.timestamp}</Text> : null}
          </View>
        </View>
      </View>
    )
  }
}

module.exports = MessageBubble
