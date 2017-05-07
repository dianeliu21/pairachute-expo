import React, {Component} from 'react'
import {
  ListView
} from 'react-native'
import MessagesListRow from './MessagesListRow'

class MessagesList extends Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(this.props.dataSource || [])
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
    return (
      <ListView
        dataSource={this.state.dataSource}
        enableEmptySections
        renderRow={(data) => <MessagesListRow loadMessages={this.props.loadMessages} thread_info={data} />}
      />
    )
  }
}

module.exports = MessagesList
