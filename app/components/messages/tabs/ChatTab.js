import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import MessageThread from '../shared/MessageThread'
import LoadingScreen from '../../shared/LoadingScreen'
const styles = require('../../../styles/styles.js')

class ChatTab extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({tintColor}) => (
      <SimpleLineIcons name='bubbles' size={26} color={tintColor} />
    ),
    title: 'Chat'
  }

  async componentWillMount () {
    await this.props.loadMessages('chatOnly', this.props.user.threads.chatOnly)
  }

  render () {
    return (
      <View style={styles.wrapper}>
        {console.log(this.props.chatOnlyThread)}
        {this.props.chatOnlyThread.isReady
          ? (<MessageThread
              user={this.props.user}
              focusedThread={this.props.chatOnlyThread}
              loadOldMessages={this.props.loadOldMessages}
              sendMessage={this.props.sendMessage}
              submitPromptResponse={this.props.submitPromptResponse}
              type='chatOnly'
            />)
          : <LoadingScreen />}
      </View>
    )
  }
}

export default ChatTab
