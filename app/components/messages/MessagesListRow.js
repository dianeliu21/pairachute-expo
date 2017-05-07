import React, {Component} from 'react'
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import MaterialInitials from 'react-native-material-initials/native'
import * as constants from '../../styles/constants.js'
const styles = require('../../styles/styles.js')

class MessagesListRow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: this.props.thread_info.title,
      msg_preview: this.props.thread_info.last_message ? this.props.thread_info.last_message.message : ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.thread_info !== nextProps.thread_info) {
      this.setState({
        title: nextProps.thread_info.title,
        msg_preview: nextProps.thread_info.last_message.message
      })
    }
  }

  render () {
    return (
      <TouchableHighlight
        onPress={() => this.props.loadMessages(this.props.thread_info)}
        underlayColor={'rgba(0,0,0,0.5)'}
      >
        <View style={styles.messageListRow}>
          <MaterialInitials backgroundColor={constants.mediumGray} color={'white'} single={false} size={constants.messageListAvatarSize} text={this.state.title} />
          <View style={styles.messageListTextWrapper}>
            <Text style={styles.messageListRowTitle}>{this.state.title}</Text>
            <Text style={styles.messageListRowPreview}>{this.state.msg_preview}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

module.exports = MessagesListRow
