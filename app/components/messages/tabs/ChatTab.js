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
      <SimpleLineIcons name='bubble' size={26} color={tintColor} />
    ),
    title: 'Chat'
  }

  async componentWillMount () {
    await this.props.loadMessages(this.props.user.threads.chatOnly)
  }

  _renderLoadingOrMessage () {
    return this.props.focusedThread.isReady
     ? <MessageThread />
     : <LoadingScreen />
  }

  render () {
    console.log('label', this.tabBarLabel)
    return (
      <View style={styles.wrapper}>
        { this._renderLoadingOrMessage() }
      </View>
    )
  }
}

export default ChatTab
