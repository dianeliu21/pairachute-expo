import React, { Component } from 'react'
import {
  Button,
  Text,
  View,
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
const styles = require('../../styles/styles.js')

class Settings extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({tintColor}) => (
      <SimpleLineIcons name='settings' size={26} color={tintColor} />
    ),
    tabBarLabel: 'Settings'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
        <Text>Name: {this.props.user.displayName}</Text>
        <Text>Email Address: {this.props.user.email}</Text>
      </View>
    )
  }
}

export default Settings
