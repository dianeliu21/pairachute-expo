import React, {Component} from 'react'
import {
  ScrollView,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import * as constants from '../../../styles/constants.js'
const styles = require('../../../styles/styles.js')

class MessageSuggestions extends Component {
  suggestedMessages = [
    {
      faIconName: 'coffee',
      message: 'I get what you’re going through.',
      type: 'emotionalSupport'
    },
    {
      faIconName: 'coffee',
      message: 'What resources do you need?',
      type: 'instrumentalSupport'
    },
    {
      faIconName: 'coffee',
      message: 'Can I offer any advice or ideas?',
      type: 'informationalSupport'
    },
    {
      faIconName: 'coffee',
      message: 'The work you’re doing is important!',
      type: 'valueAppraisal'
    },
    {
      faIconName: 'coffee',
      message: 'Well done on that task!',
      type: 'workAppraisal'
    },
    {
      faIconName: 'coffee',
      message: 'I’m glad you’re here!',
      type: 'personalAppraisal'
    },
    {
      faIconName: 'coffee',
      message: 'Want to meet for coffee?',
      type: 'coffee'
    },
    {
      faIconName: 'coffee',
      message: 'Thank you for your support!',
      type: 'gratitude'
    },
  ]

  renderSuggestions = () => {
    return this.suggestedMessages.map((item) => {
      return (
        <TouchableHighlight
          key={item.type}
          onPress={() => this.props.onPressSuggestion(item.message)}
          underlayColor={'rgba(255,255,255,0)'}
        >
          <View style={[styles.messageBubble, styles.backgroundTeal, styles.marginFive]}>
            <Text style={styles.sentMessageText}>{item.message}</Text>
          </View>
        </TouchableHighlight>
      )
    })
  }

  render () {
    return (
      <View style={[styles.borderTop, styles.borderGray]}>
        <Text style={styles.smallHelpCenter}>Need suggestions? Use these examples: </Text>
        <ScrollView horizontal contentContainerStyle={[styles.flexRowCenter, {flexWrap: 'wrap'}]}>
          { this.renderSuggestions() }
        </ScrollView>
      </View>
    )
  }
}

// <View style={[styles.flexRowCenter, {flexWrap: 'wrap'}]}>
// <View style={[styles.messageBubble, styles.backgroundTeal, styles.marginFive, {width: (this.props.screenWidth - 20) / 2}]}>


module.exports = MessageSuggestions
