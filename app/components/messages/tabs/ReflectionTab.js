import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import MessageThread from './../shared/MessageThread'
import LoadingScreen from '../../shared/LoadingScreen'
const styles = require('../../../styles/styles.js')

class ReflectionTab extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({tintColor}) => (
      <SimpleLineIcons name='note' size={26} color={tintColor}/>
    ),
    title: 'Reflect'
  }

  async componentWillMount () {
    console.log('this is props', this.props)
    await this.props.loadMessages(this.props.user.threads.reflectionOnly)
  }

  render () {
    return (
      <View style={styles.wrapper}>
        {this.props.focusedThread.isReady
          ? (<MessageThread
              user={this.props.user}
              focusedThread={this.props.focusedThread}
              loadOldMessages={this.props.loadOldMessages}
              sendMessage={this.props.sendMessage}
              submitPromptResponse={this.props.submitPromptResponse}
            />)
          : <LoadingScreen />}
      </View>
    )
  }
}

export default ReflectionTab
