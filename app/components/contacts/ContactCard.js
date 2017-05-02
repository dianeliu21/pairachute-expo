import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'
const styles = require('../../styles/styles.js')

class ContactCard extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>{this.props.focusedContact.first_name} {this.props.focusedContact.last_name}</Text>
        <Text>{this.props.focusedContact.email}</Text>
        <Text>{this.props.focusedContact.phone_number}</Text>
      </View>
    )
  }
}

module.exports = ContactCard
