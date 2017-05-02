import React, {Component} from 'react'
import {
  ListView
} from 'react-native'

import ContactsListRow from './ContactsListRow'

class ContactsList extends Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(this.props.dataSource ? this.props.dataSource : [])
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps && nextProps.dataSource) {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      this.setState({
        dataSource: ds.cloneWithRows(nextProps.dataSource)
      })
    }
  }

  render () {
    console.log('data source row count', this.state.dataSource.getRowCount())
    return (
      <ListView
        dataSource={this.state.dataSource}
        enableEmptySections
        renderRow={(data) => <ContactsListRow loadContactCard={this.props.loadContactCard} contact_info={data} />}
      />
    )
  }
}

module.exports = ContactsList
