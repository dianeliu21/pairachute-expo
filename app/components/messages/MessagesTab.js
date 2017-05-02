import React, {Component} from 'react'
import {
  View
} from 'react-native'
import MessagesList from './MessagesList'
import { Entypo } from '@expo/vector-icons'
const styles = require('../../styles/styles.js')

class MessagesTab extends Component {
  static navigationOptions = {
    headerLeft: null,
    tabBarIcon: ({tintColor}) => (
      <Entypo name={'chat'} size={26} color={tintColor} />
    ),
    tabBarLabel: 'Messages',
    title: 'Messages'
  }

  async componentWillMount () {
    await this.props.loadThreadList()
  }

  render () {
    return (
      <View style={styles.wrapper}>
        <MessagesList initialLoadMessages={this.props.initialLoadMessages} loadNewMessages={this.props.loadNewMessages} dataSource={this.props.threads.threads} />
      </View>
    )
  }
}

module.exports = MessagesTab
