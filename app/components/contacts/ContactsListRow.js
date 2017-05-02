import React, {Component} from 'react'
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native'
const styles = require('../../styles/styles.js')

class ContactsListRow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      first_name: this.props.contact_info.first_name,
      last_name: this.props.contact_info.last_name
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.contact_info !== nextProps.contact_info) {
      this.setState({
        first_name: nextProps.contact_info.first_name,
        last_name: nextProps.contact_info.last_name
      })
    }
  }

  render () {
    return (
      <TouchableHighlight
        onPress={() => this.props.loadContactCard(this.props.contact_info.uid)}
        underlayColor={'rgba(0,0,0,0.5)'}
      >
        <View style={styles.messageListRow}>
          <Text style={styles.messageListRowTitle}>{this.state.first_name} {this.state.last_name}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

module.exports = ContactsListRow
