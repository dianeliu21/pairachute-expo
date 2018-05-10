import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeAvatar } from '../../actions/authActions'

import React, { Component } from 'react'
import {
  FlatList,
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import Avatar from './Avatar'

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

class ChangeAvatar extends Component {
  static navigationOptions = {
    title: 'Change Avatar'
  }

  constructor(props) {
    super(props)
    this.state = {
      displayMessages: true,
      avatarIndex: this.props.user.avatarIndex,
    }
  }

  /*componentWillMount {
    await
  }*/

  _handleSelection = (index: String) => {
    this.setState({avatarIndex: index})
    this.setState({displayMessages: true})
    this.props.changeAvatar(index)
  }

  _renderAvatar = ({item}) => (
    <Avatar
      index={item.index}
      selected={this.state.avatarIndex}
      onPress={this._handleSelection}
    />
  );

  render() {
    avatarData = []
    for (var i=0; i < avatarImages.length; i++) {
      avatarData.push({key: i.toString(), index: i})
    }
    return (
      <View style={styles.settingsAvatarContainer}>
        <FlatList
          data={avatarData}
          showsHorizontalScrollIndicator={false}
          renderItem={this._renderAvatar}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authState: state.authState,
    user: state.user,
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({changeAvatar}, dispatch)
}

const ChangeAvatarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeAvatar)

export default ChangeAvatarContainer
