import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import MessageThread from './../shared/MessageThread'
import LoadingScreen from '../../shared/LoadingScreen'
import Placeholder from '../../shared/Placeholder'
const styles = require('../../../styles/styles.js')

class ReflectionAndChatTab extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({tintColor}) => (
      <SimpleLineIcons name='bubbles' size={26} color={tintColor} />
    ),
    title: 'Reflect and Chat'
  }

  async componentWillMount () {
    await this.props.loadMessages('reflectionAndChat', this.props.user.threads.reflectionAndChat)
  }

  render () {
    return (
      <View style={styles.wrapper}>
        {this.props.reflectionAndChatThread.isReady
          ? (<MessageThread
              user={this.props.user}
              focusedThread={this.props.reflectionAndChatThread}
              loadOldMessages={this.props.loadOldMessages}
              sendMessage={this.props.sendMessage}
              submitPromptResponse={this.props.submitPromptResponse}
              type='reflectionAndChat'
            />)
          : <LoadingScreen />}
      </View>
    )
  }
}

export default ReflectionAndChatTab
