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

const avatarNeutral = require('../../../resources/avatars/avatar_general.png')
const avatarImages = [
  // Women straight hair
  require('../../../resources/avatars/avatar_female_straight_black.png'),
  require('../../../resources/avatars/avatar_female_straight_black_glasses.png'),
  require('../../../resources/avatars/avatar_brown_female_straight_black.png'),
  require('../../../resources/avatars/avatar_brown_female_straight_black_glasses.png'),
  require('../../../resources/avatars/avatar_female_straight_brunette.png'),
  require('../../../resources/avatars/avatar_female_straight_brunette_glasses.png'),
  require('../../../resources/avatars/avatar_female_straight_blond.png'),
  require('../../../resources/avatars/avatar_female_straight_blond_glasses.png'),

  // Women braided hair
  require('../../../resources/avatars/avatar_white_female_braided_black.png'),
  require('../../../resources/avatars/avatar_white_female_braided_black_glasses.png'),
  require('../../../resources/avatars/avatar_brown_female_braided_black.png'),
  require('../../../resources/avatars/avatar_brown_female_braided_black_glasses.png'),
  require('../../../resources/avatars/avatar_white_female_braided_brunette.png'),
  require('../../../resources/avatars/avatar_white_female_braided_brunette_glasses.png'),
  require('../../../resources/avatars/avatar_white_female_braided_blond.png'),
  require('../../../resources/avatars/avatar_white_female_braided_blond_glasses.png'),

  // Men short hair
  require('../../../resources/avatars/avatar_white_short_black.png'),
  require('../../../resources/avatars/avatar_white_short_black_glasses.png'),
  require('../../../resources/avatars/avatar_brown_short_black.png'),
  require('../../../resources/avatars/avatar_brown_short_black_glasses.png'),
  require('../../../resources/avatars/avatar_white_short_brunette.png'),
  require('../../../resources/avatars/avatar_white_short_brunette_glasses.png'),
  require('../../../resources/avatars/avatar_white_short_blond.png'),
  require('../../../resources/avatars/avatar_white_short_blond_glasses.png'),

  // Men long hair
  require('../../../resources/avatars/avatar_white_long_black.png'),
  require('../../../resources/avatars/avatar_white_long_black_glasses.png'),
  require('../../../resources/avatars/avatar_white_long_brunette.png'),
  require('../../../resources/avatars/avatar_white_long_brunette_glasses.png'),
  require('../../../resources/avatars/avatar_white_long_blond.png'),
  require('../../../resources/avatars/avatar_white_long_blond_glasses.png')
]

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
    /*return async function (dispatch) {
      try {
        dispatch(NavigationActions.navigate({routeName: 'Login'}))
      } catch (error) {
        console.log(error.message)
      }
    }*/
  }

  render() {
    avatar = this.props.user.avatarIndex
      ? avatarImages[this.props.user.avatarIndex]
      : avatarNeutral
    return (
      <View style={styles.container}>
        <Image
          style={{width: 75, height: 75}}
          source={avatar}
        />
        <Image
          style={{width: 350, height: 100}}
          source={require('../../../resources/rightpoint_logo.png')}
        />
        <Text style={styles.settingsText}>{this.props.user.email}</Text>
        <TouchableHighlight
          style={styles.settingsButton}
          onPress={() => this.props.navToChangeAvatar()}>
          <Text style={styles.settingsButtonText}> Change Avatar </Text>
        </TouchableHighlight>
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
