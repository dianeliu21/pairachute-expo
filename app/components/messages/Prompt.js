import React, {Component} from 'react'
import {
  Text,
  View
} from 'react-native'
import MaterialInitials from 'react-native-material-initials/native'
const styles = require('../../styles/styles.js')

class Prompt extends Component {
  _getPromptResponses () {
    if (this.props.data.responses) {
      return (
        Object.entries(this.props.data.responses).map(item =>
          <Text key={item[0]}>{item[1]}</Text>
        )
      )
    }
  }

  render () {
    return (
      <View style={styles.promptContainer}>
        <View style={styles.promptHeadingContainer}>
          <MaterialInitials backgroundColor={'#FC6150'} color={'white'} size={25} text={'Pairachute'} />
          <Text style={styles.promptHeading}>Pairachute Prompt</Text>
        </View>
        <Text>{this.props.data.message}</Text>
        {this._getPromptResponses()}
      </View>
    )
  }
}

module.exports = Prompt
