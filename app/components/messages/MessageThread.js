import React, {Component} from 'react'
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'
import MessageBubble from './MessageBubble'
import Prompt from './Prompt'
import PromptResponse from './PromptResponse'
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

  _displayMessage (data) {
    if (data.item.senderId === 'prompt') {
      return (<View style={styles.inverted}><Prompt data={data.item} senderId={this.props.user.uid} submitPromptResponse={this.props.submitPromptResponse} threadId={this.props.focusedThread.id} /></View>)
    } else if (data.item.senderId === 'promptResponse') {
      return (<View style={styles.inverted}><PromptResponse users={this.props.focusedThread.users} senderId={this.props.user.uid} submitPromptResponse={this.props.submitPromptResponse} threadId={this.props.focusedThread.id} data={data.item} /></View>)
    } else {
      return (<View style={styles.inverted}><MessageBubble users={this.props.focusedThread.users} sender_id={this.props.user.uid} message={data.item} /></View>)
    }
  }

  _renderLoadOldMessages = () => {
    return <TouchableHighlight
      onPress={() => this.props.loadOldMessages(this.props.focusedThread.id, this.props.focusedThread.oldestMsgKey)}
      underlayColor={'rgba(255,255,255,0)'}
    >
      <View style={[styles.inverted, styles.loadOldMessageButton]}>
        <Text>Load previous messages</Text>
      </View>
    </TouchableHighlight>
  }

  _sendMessage (text, senderUid, threadId) {
    this.props.sendMessage(text, senderUid, threadId)
    this.setState({
      text: ''
    })
  }

  render () {
    return (
      <KeyboardAvoidingView behavior={this.state.behavior} style={styles.wrapper} keyboardVerticalOffset={60}>
        <View
          onLayout={(e) => { this.setState({screenWidth: e.nativeEvent.layout.width}) }}
          style={styles.wrapper}>
          <FlatList
            data={this.props.focusedThread.messages}
            ListFooterComponent={this._renderLoadOldMessages}
            ref={(component) => this._flatList = component}
            renderItem={(data) => this._displayMessage(data)}
            style={styles.inverted}
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
