import React, { Component } from 'react'
import {
  Image,
  TouchableHighlight,
  View,
} from 'react-native'

const constants = require('../../styles/constants.js')
const styles = require('../../styles/styles.js')
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

class Avatar extends React.PureComponent {
  _onPress = () => {
    this.props.onPress(this.props.index.toString());
  };

  _renderBorder () {
    return (
      <View style={styles.settingsAvatarSelected}></View>
    )
  }

  render() {
    return (
      <TouchableHighlight
        activeOpacity={.5}
        underlayColor={constants.pastelBlue}
        onPress={this._onPress}>
        <View style={styles.settingsAvatarSelectedContainer}>
          <Image
            source={avatarImages[parseInt(this.props.index)]}
            style={styles.settingsAvatar}
          />
          {this.props.selected == this.props.index.toString() ? this._renderBorder() : null}
        </View>
      </TouchableHighlight>
    )
  }
}

export default Avatar
