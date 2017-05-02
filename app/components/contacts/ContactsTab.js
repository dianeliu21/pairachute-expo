import React, {Component} from 'react'
import {
  View
} from 'react-native'
import ContactsList from './ContactsList'
const styles = require('../../styles/styles.js')

class ContactsTab extends Component {
  async componentWillMount () {
    await this.props.loadContacts()
  }

  render () {
    return (
      <View style={styles.messageListContainer}>
        <ContactsList loadContactCard={this.props.loadContactCard} dataSource={this.props.contacts ? this.props.contacts.contacts : null} />
      </View>
    )
  }
}

module.exports = ContactsTab
