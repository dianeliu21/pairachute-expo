import React, { Component } from 'react'
import {
  Button,
  Text,
  View,
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
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
        <Text style={styles.f_30}>Settings</Text>
        <Text style={styles.f_20}>Name: {this.props.user.displayName}</Text>
        <Text>Email Address: {this.props.user.email}</Text>
        <Button
          onPress={() => this.props.navToChangePassword()}
          title={'Change Password'}
        />
      </View>
    )
  }
}

export default Settings
