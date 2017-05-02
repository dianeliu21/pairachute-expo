import React, {Component} from 'react'
import {
  View
} from 'react-native'
import ContactsList from '../contacts/ContactsList'
const styles = require('../../styles/styles.js')

class ContactsTab extends Component {
  async componentWillMount () {
    await this.props.loadContacts()
  }

  render () {
    return (
      <View>
        <View style={styles.messageListContainer}>
          <ContactsList dataSource={this.props.contacts ? this.props.contacts.contacts : null} />
        </View>
      </View>
    )
  }
}

module.exports = ContactsTab
