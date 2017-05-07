import React, {Component} from 'react'
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import MaterialInitials from 'react-native-material-initials/native'
import PromptResponse from './PromptResponse'
const styles = require('../../styles/styles.js')

class Prompt extends Component {
  _getPromptResponses () {
    if (this.props.data.responses) {
      return (
        Object.entries(this.props.data.responses).map(item =>
          <PromptResponse key={item[0]} responseText={item[1]} />
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
        <View style={styles.promptTextContainer}>
          <Text>{this.props.data.message}</Text>
        </View>
        {this._getPromptResponses()}
      </View>
    )
  }
}

module.exports = Prompt
