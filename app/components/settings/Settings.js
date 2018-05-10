import React, { Component } from 'react'
import {
  Image,
  TouchableHighlight,
  Text,
  View,
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
const styles = require('../../styles/styles.js')

var reactNative = require('react-native');
var {
  AsyncStorage
} = reactNative;

class Settings extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({tintColor}) => (
      <SimpleLineIcons name='settings' size={26} color={tintColor} />
    ),
    tabBarLabel: 'Settings'
  }

  logout() {
    AsyncStorage.multiRemove(['email', 'password']);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 350, height: 100}}
          source={require('../../../resources/rightpoint_logo.png')}
        />
        <Text style={styles.settingsText}>{this.props.user.email}</Text>
        <TouchableHighlight
          style={styles.settingsButton}
          onPress={() => this.props.navToChangePassword()}>
          <Text style={styles.settingsButtonText}> Change Password </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.settingsButton}
          onPress={() => this.logout()}>
          <Text style={styles.settingsButtonText}> Log Out </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default Settings
