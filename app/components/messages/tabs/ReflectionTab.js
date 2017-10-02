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
    await this.props.loadMessages(this.props.user.threads.reflectionOnly)
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

export default ReflectionTab
