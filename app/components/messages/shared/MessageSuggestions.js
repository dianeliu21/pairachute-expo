import React, {Component} from 'react'
import {
  ScrollView,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import * as constants from '../../../styles/constants.js'
const styles = require('../../../styles/styles.js')

class MessageSuggestions extends Component {
  iconSize = 20
  iconColor = 'white'
  suggestedMessagesRowOne = [
    {
      icon: (<FontAwesome name='road' size={this.iconSize} color={this.iconColor}/>),
      message: 'I get what you’re going through.',
      type: 'emotionalSupport'
    },
    {
      icon: (<FontAwesome name='smile-o' size={this.iconSize} color={this.iconColor} />),
      message: 'I’m glad you’re here!',
      type: 'personalAppraisal'
    },
    {
      icon: (<Entypo name='thumbs-up' size={this.iconSize} color={this.iconColor} />),
      message: 'Well done on that task!',
      type: 'workAppraisal'
    },
    {
      icon: (<Ionicons name='ios-paper' size={this.iconSize} color={this.iconColor} />),
      message: 'The work you’re doing is important!',
      type: 'valueAppraisal'
    }
  ]
  suggestedMessagesRowTwo = [
    {
      icon: (<Entypo name='tools' size={this.iconSize} color={this.iconColor} />),
      message: 'What resources do you need?',
      type: 'instrumentalSupport'
    },
    {
      icon: (<Entypo name='chat' size={this.iconSize} color={this.iconColor} />),
      message: 'Can I offer any advice or ideas?',
      type: 'informationalSupport'
    },
    {
      icon: (<FontAwesome name='coffee' size={this.iconSize} color={this.iconColor} />),
      message: 'Want to meet for coffee?',
      type: 'coffee'
    },
    {
      icon: (<MaterialCommunityIcons name='human-greeting' size={this.iconSize} color={this.iconColor} />),
      message: 'Thank you for your support!',
      type: 'gratitude'
    },
  ]

  renderSuggestions = (suggestions) => {
    return suggestions.map((item) => {
      return (
        <TouchableHighlight
          key={item.type}
          onPress={() => this.props.onPressSuggestion(item.message)}
          underlayColor={'rgba(255,255,255,0)'}
        >
          <View style={[styles.messageBubble, styles.backgroundTeal, styles.marginFive, styles.flexRowCenter]}>
            <View style={{paddingLeft: 10}}>
              {item.icon}
            </View>
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
        <ScrollView horizontal>
          <View style={styles.flexColumn}>
            <View style={styles.flexRowCenter}>{ this.renderSuggestions(this.suggestedMessagesRowOne) }</View>
            <View style={styles.flexRowCenter}>{ this.renderSuggestions(this.suggestedMessagesRowTwo) }</View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

// <View style={[styles.flexRowCenter, {flexWrap: 'wrap'}]}>
// <View style={[styles.messageBubble, styles.backgroundTeal, styles.marginFive, {width: (this.props.screenWidth - 20) / 2}]}>


module.exports = MessageSuggestions
