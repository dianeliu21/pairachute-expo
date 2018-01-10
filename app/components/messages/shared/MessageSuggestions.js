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
  suggestedMessagesRow1 = [
    {
      icon: (<FontAwesome name='road' size={this.iconSize} color={this.iconColor}/>),
      emoji: '🛣',
      message: 'I get what you’re going through.',
      type: 'emotionalSupport'
    },
    {
      icon: (<FontAwesome name='smile-o' size={this.iconSize} color={this.iconColor} />),
      emoji: '😀',
      message: 'I’m glad you’re here!',
      type: 'personalAppraisal'
    }
  ]
  suggestedMessagesRow2 = [
    {
      icon: (<Entypo name='thumbs-up' size={this.iconSize} color={this.iconColor} />),
      emoji: '👍',
      message: 'Well done on that task!',
      type: 'workAppraisal'
    },
    {
      icon: (<Ionicons name='ios-paper' size={this.iconSize} color={this.iconColor} />),
      emoji: '📄',
      message: 'The work you’re doing is important!',
      type: 'valueAppraisal'
    }
  ]
  suggestedMessagesRow3 = [
    {
      icon: (<Entypo name='tools' size={this.iconSize} color={this.iconColor} />),
      emoji: '🛠',
      message: 'What resources do you need?',
      type: 'instrumentalSupport'
    },
    {
      icon: (<Entypo name='chat' size={this.iconSize} color={this.iconColor} />),
      emoji: '💬',
      message: 'Can I offer any advice or ideas?',
      type: 'informationalSupport'
    }
  ]
  suggestedMessagesRow4 = [
    {
      icon: (<FontAwesome name='coffee' size={this.iconSize} color={this.iconColor} />),
      emoji: '☕️',
      message: 'Want to meet for coffee?',
      type: 'coffee'
    },
    {
      icon: (<MaterialCommunityIcons name='human-greeting' size={this.iconSize} color={this.iconColor} />),
      emoji: '🙏',
      message: 'Thank you for your support!',
      type: 'gratitude'
    },
  ]

  concatMessage (emoji, message) {
    emojiSpace = emoji.concat(' ');
    return emojiSpace.concat(message);
  }

  renderSuggestions = (suggestions) => {
    return suggestions.map((item) => {
      return (
        <TouchableHighlight
          key={item.type}
          onPress={() => this.props.onPressSuggestion(this.concatMessage(item.emoji, item.message))}
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
            <View style={styles.flexRowCenter}>{ this.renderSuggestions(this.suggestedMessagesRow1) }</View>
            <View style={styles.flexRowCenter}>{ this.renderSuggestions(this.suggestedMessagesRow2) }</View>
            <View style={styles.flexRowCenter}>{ this.renderSuggestions(this.suggestedMessagesRow3) }</View>
            <View style={styles.flexRowCenter}>{ this.renderSuggestions(this.suggestedMessagesRow4) }</View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

// <View style={[styles.flexRowCenter, {flexWrap: 'wrap'}]}>
// <View style={[styles.messageBubble, styles.backgroundTeal, styles.marginFive, {width: (this.props.screenWidth - 20) / 2}]}>


module.exports = MessageSuggestions
