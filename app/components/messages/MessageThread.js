import React, {Component} from 'react'
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  View
} from 'react-native'
import MessageBubble from './MessageBubble'
import Prompt from './Prompt'
const styles = require('../../styles/styles.js')

class MessageThread extends Component {
  constructor (props) {
    super(props)
    this.state = {
      behavior: 'padding',
      data: [],
      screenWidth: 0,
      text: ''
    }
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.title
  })

  // componentWillMount () {
  //   this._prepareMessages()
  // }

  componentDidUpdate () {
    // this._flatList.scrollToEnd({animated: false})
  }

  // componentWillReceiveProps (nextProps) {
  //   if (this.props !== nextProps && nextProps.focusedThread.messages) {
  //     this._prepareMessages(nextProps.focusedThread.messages)
  //   }
  // }

  // _prepareMessages (messages = this.props.focusedThread.messages) {
  //   var messagesArray = []
  //   if (messages) {
  //     var prevSenderId = null
  //     var prevMessageTimestamp = null
  //     var prevMessageKey = null
  //     for (var key in messages) {
  //       messages[key].prev_sender_id = prevSenderId
  //       messages[key].prev_message_timestamp = prevMessageTimestamp
  //       prevSenderId = messages[key].sender_id
  //       prevMessageTimestamp = messages[key].timestamp
  //
  //       messages[key].next_sender_id = null
  //       messages[key].next_message_timestamp = null
  //
  //       if (prevMessageKey) {
  //         messages[prevMessageKey].next_sender_id = messages[key].sender_id
  //         messages[prevMessageKey].next_message_timestamp = messages[key].timestamp
  //       }
  //       prevMessageKey = key
  //     }
  //     messagesArray = Object.keys(messages).map(function (e) {
  //       return Object.assign({}, messages[e], {
  //         key: e
  //       })
  //     })
  //   }
  //   this.setState({data: messagesArray})
  // }

  _displayMessage (data) {
    if (data.item.sender_id === 'prompt') {
      return (<Prompt data={data.item} />)
    } else {
      return (<MessageBubble users={this.props.focusedThread.users} sender_id={this.props.user.uid} message={data.item} />)
    }
  }

  _renderHeader = () => {
    return <Button
      onPress={() => this.props.loadOldMessages(this.props.focusedThread.id, this.props.focusedThread.oldestMsgKey)}
      title={'Load previous messages'}
    />
  }

  _sendMessage (text, senderUid, threadId) {
    this.props.sendMessage(text, senderUid, threadId)
    this.setState({
      text: ''
    })
  }

  // <ScrollView
  //   ref={(component) => this.scrollView = component}
  //   onContentSizeChange={(contentWidth, contentHeight) => { this.setState({listHeight: contentHeight}) }}
  //   onLayout={(e) => { this.setState({scrollViewHeight: e.nativeEvent.layout.height, screenWidth: e.nativeEvent.layout.width}) }}
  // >
  //   <Button
  //     onPress={() => this.props.loadOldMessages(this.props.focusedThread.id, this.props.focusedThread.oldestMsgKey)}
  //     title={'Load previous messages'}
  //   />
  //   <ListView
  //     dataSource={this.state.dataSource}
  //     enableEmptySections
  //     renderRow={(data) => this._displayMessage(data)}
  //   />
  // </ScrollView>

  // onRefresh={() => this.props.loadOldMessages(this.props.focusedThread.id, this.props.focusedThread.oldestMsgKey)}
  // refreshing={false}

  render () {
    return (
      <KeyboardAvoidingView behavior={this.state.behavior} style={styles.wrapper} keyboardVerticalOffset={60}>
        <View
          onLayout={(e) => { this.setState({screenWidth: e.nativeEvent.layout.width}) }}
          style={styles.wrapper}>
          <FlatList
            data={this.props.focusedThread.messages}
            ref={(component) => this._flatList = component}
            renderItem={(data) => this._displayMessage(data)}
          />
        </View>
        <View style={styles.messageInputView}>
          <TextInput
            multiline
            onChangeText={(text) => this.setState({text})}
            placeholder={'Type a message'}
            style={[styles.messageTextInput, {width: this.state.screenWidth - 65}]}
            value={this.state.text}
          />
          <Button
            onPress={() => this._sendMessage(this.state.text, this.props.user.uid, this.props.focusedThread.id)}
            title={'Send'}
            style={styles.messageSend}
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

module.exports = MessageThread
