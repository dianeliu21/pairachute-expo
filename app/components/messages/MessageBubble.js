import React, {Component} from 'react'
import {
  Text,
  View
} from 'react-native'
import MaterialInitials from 'react-native-material-initials/native'
import * as constants from '../../styles/constants.js'
const styles = require('../../styles/styles.js')

class MessageBubble extends Component {
  _getAvatar () {
    return !this._isOwnMessage() && !this._isSameSenderAsNext()
      ? (<MaterialInitials backgroundColor={constants.mediumGray} color={'white'} single={false} size={constants.messageAvatarSize} style={styles.messageAvatar} text={this.props.users[this.props.message.senderId] || ''} />)
      : null
  }

  _getBubbleStyle () {
    return this._isOwnMessage() ? styles.sentMessage : styles.receivedMessage
  }

  _getBubbleTextStyle () {
    return this._isOwnMessage() ? styles.sentMessageText : styles.receivedMessageText
  }

  _getSenderName () {
    return !this._isOwnMessage() && !this._isSameSenderAsPrev()
     ? (<Text style={styles.receivedMessageSender}>{this.props.users[this.props.message.senderId]}</Text>)
     : null
  }

  _getWrapperStyle () {
    if (!this._isOwnMessage()) {
      if (!this._isSameSenderAsNext()) {
        return styles.receivedMsgBubbleWrapperWithAvatar
      }
      return styles.receivedMsgBubbleWrapperNoAvatar
    }
    return styles.sentMsgBubbleWrapper
  }

  _isOwnMessage () {
    return this.props.message.senderId === this.props.sender_id
  }

  _isSameSenderAsNext () {
    return this.props.message.senderId === this.props.message.nextSenderId
  }

  _isSameSenderAsPrev () {
    return this.props.message.senderId === this.props.message.prevSenderId
  }

  _parseTimestamp () {
    var time = new Date(this.props.message.timestamp)
    return time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  }

  _renderDate () {
    var currDate = new Date(this.props.message.timestamp)
    var prevDate = new Date(this.props.message.prevMessageTimestamp)
    return this.props.message.timestamp - this.props.message.prevMessageTimestamp > 86400000 || currDate.getDay() !== prevDate.getDay()
      ? <Text style={styles.messageDate}>{currDate.toLocaleDateString([], {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'})}</Text>
      : null
  }

  _renderTimestampLeft () {
    return this._isOwnMessage()
      ? (<View>
        <Text style={styles.messageTimestamp}>{this._parseTimestamp()}</Text>
      </View>)
      : null
  }

  _renderTimestampRight () {
    return !this._isOwnMessage()
      ? <View><Text style={styles.messageTimestamp}>{this._parseTimestamp()}</Text></View>
      : null
  }

  render () {
    return (
      <View>
        {this._renderDate()}
        {this._getSenderName()}
        <View style={this._getWrapperStyle()}>
          {this._getAvatar()}
          {this._renderTimestampLeft()}
          <View style={[styles.messageBubble, this._getBubbleStyle()]}>
            <Text style={this._getBubbleTextStyle()}>{this.props.message.message}</Text>
          </View>
          {this._renderTimestampRight()}
        </View>
      </View>
    )
  }
}

module.exports = MessageBubble
